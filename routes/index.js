// const express = require('express');
// const router = express.Router();
// const pool = require('../db/connection');

// Renderiza la página principal
// router.get('/', (req, res) => {
//     pool.query('SELECT * FROM sections ORDER BY sections.price DESC', (err, sections) => {
//         if (err) throw err;
//         pool.query('SELECT * FROM sponsors', (err, sponsors) => {
//             if (err) throw err;
//             pool.query('SELECT * FROM positions', (err, positions) => {
//                 if (err) throw err;
//                 res.render('index', { sections, sponsors, positions });
//             });
//         });
//     });

// });


// router.get('/view-sponsors', (req, res) => {
//     pool.query('SELECT * FROM sponsors', (err, sponsors) => {
//         if (err) throw err;
//         // Obtener el próximo ID disponible
//         pool.query('SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = "sponsors"', (err, result) => {
//             if (err) throw err;
//             const nextId = result[0].AUTO_INCREMENT;

//             res.render('view-sponsors', { sponsors, nextId });
//         });
//     });
// });

// // Ruta para añadir un patrocinador
// router.post('/add-sponsor', (req, res) => {
//     const { name } = req.body;
//     pool.query('INSERT INTO sponsors (name) VALUES (?)', [name], (err, result) => {
//         if (err) throw err;
//         res.redirect('/view-sponsors');
//     });
// });


// // Ruta para actualizar el patrocinador
// router.post('/update-position-sponsor', (req, res) => {
//     const { id, sponsor_id } = req.body;
//     pool.query('UPDATE positions SET sponsor_id = ? WHERE id = ?', [sponsor_id, id], (err, result) => {
//         if (err) throw err;
//         res.json({ success: true });
//     });
// });

// // Ruta para actualizar el patrocinador
// router.post('/remove-position-sponsor', (req, res) => {
//     const { id } = req.body;
//     pool.query('UPDATE positions SET sponsor_id = null WHERE id = ?', [id], (err, result) => {
//         if (err) throw err;
//         res.json({ success: true });
//     });
// });

// Agregar más rutas para manejar CRUD de sponsors y positions...


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
