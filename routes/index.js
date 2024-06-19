const express = require('express');
const router = express.Router();
const sections = require('../services/sections');
const sponsors = require('../services/sponsors');
const positions = require('../services/positions');

router.get('/', async function (req, res, next) {
    try {
        const sectionsData = await sections.getMultiple(req.query.page);
        const sponsorsData = await sponsors.getMultiple(req.query.page);
        const positionsData = await positions.getMultiple(req.query.page);

        res.render('index', { sections: sectionsData.data, sponsors: sponsorsData.data, positions: positionsData.data });
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});

router.get('/view-sponsors', async function (req, res, next) {
    try {
        const sponsorsData = await sponsors.getMultiple(req.query.page);

        const nextIDData = await sponsors.getNextID(req.query.page);

        res.render('view-sponsors', { sponsors: sponsorsData.data, nextId: nextIDData.data[0].AUTO_INCREMENT });
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});

router.post('/add-sponsor', async function (req, res, next) {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "The 'name' field is required" });
        }

        // console.log('Data:', name);

        const result = await sponsors.postSponsor(name);

        return res.redirect('/view-sponsors');
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});



router.post('/update-position-sponsor', async function (req, res, next) {
    try {
        const { id, sponsor_id } = req.body;
        
        if (!id) {
            return res.status(400).json({ error: "The 'id' field is required" });
        }
        if (!sponsor_id) {
            throw new Error("The 'sponsor_id' parameter is required");
        }
        // console.log('Data:', name);

        const result = await positions.updatePositionSponsor(id,sponsor_id);

        return  res.json({ success: true, data: result });
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});

router.post('/remove-position-sponsor', async function (req, res, next) {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ error: "The 'id' field is required" });
        }
        // console.log('Data:', name);

        const result = await positions.removePositionSponsor(id);

        return  res.json({ success: true, data: result });
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});



module.exports = router;
