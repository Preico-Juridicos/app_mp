const express = require('express');
const router = express.Router();
const canvas = require('../services/canvas');
const sections = require('../services/sections');
const sponsors = require('../services/sponsors');
const positions = require('../services/positions');

// Paginas
router.get('/', async function (req, res, next) {
    try {
        const sectionsData = await sections.getMultipleByType('bike', req.query.page);
        const sponsorsData = await sponsors.getMultiple(req.query.page);
        const positionsData = await positions.getMultiple(req.query.page);

        res.render('index', { currentRoute: '/', sections: sectionsData.data, sponsors: sponsorsData.data, positions: positionsData.data, type: 'bike', imgId: 'bike' });
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});
// router.get('/bike', async function (req, res, next) {
//     try {
//         const sectionsData = await sections.getMultipleByType('bike', req.query.page);
//         const sponsorsData = await sponsors.getMultiple(req.query.page);
//         const positionsData = await positions.getMultiple(req.query.page);

//         res.render('bike', { currentRoute: '/bike', sections: sectionsData.data, sponsors: sponsorsData.data, positions: positionsData.data, type: 'bike', imgId: 'bike' });
//     } catch (err) {
//         console.error(`Error while getting data `, err.message);
//         next(err);
//     }
// });
router.get('/bike', async function (req, res, next) {
    try {
        const name = req.originalUrl.substring(1);
        const canvaData = await canvas.getCanvaByName(name);
        const sectionsData = await sections.getMultipleByType(name, req.query.page);
        const sponsorsData = await sponsors.getMultiple(req.query.page);
        const positionsData = await positions.getMultiple(req.query.page);
        res.render(name, { currentRoute: req.originalUrl, canvas: canvaData.data, sections: sectionsData.data, sponsors: sponsorsData.data, positions: positionsData.data, type: name, imgId: name });
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});
router.get('/truck', async function (req, res, next) {
    try {
        const name = req.originalUrl.substring(1);
        const canvaData = await canvas.getCanvaByName(name);
        const sectionsData = await sections.getMultipleByType(name, req.query.page);
        const sponsorsData = await sponsors.getMultiple(req.query.page);
        const positionsData = await positions.getMultiple(req.query.page);

        res.render(name, { currentRoute: req.originalUrl, canvas: canvaData.data, sections: sectionsData.data, sponsors: sponsorsData.data, positions: positionsData.data, type: name, imgId: name });
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});
router.get('/helmet', async function (req, res, next) {
    try {
        const name = req.originalUrl.substring(1);
        const canvaData = await canvas.getCanvaByName(name);
        const sectionsData = await sections.getMultipleByType(name, req.query.page);
        const sponsorsData = await sponsors.getMultiple(req.query.page);
        const positionsData = await positions.getMultiple(req.query.page);

        res.render(name, { currentRoute: req.originalUrl, canvas: canvaData.data, sections: sectionsData.data, sponsors: sponsorsData.data, positions: positionsData.data, type: name, imgId: name });
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});
router.get('/suit', async function (req, res, next) {
    try {
        const name = req.originalUrl.substring(1);
        const canvaData = await canvas.getCanvaByName(name);
        const sectionsData = await sections.getMultipleByType(name, req.query.page);
        const sponsorsData = await sponsors.getMultiple(req.query.page);
        const positionsData = await positions.getMultiple(req.query.page);

        res.render(name, { currentRoute: req.originalUrl, canvas: canvaData.data, sections: sectionsData.data, sponsors: sponsorsData.data, positions: positionsData.data, type: name, imgId: name });
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});
router.get('/view-sponsors', async function (req, res, next) {
    try {
        const sponsorsData = await sponsors.getMultiple(req.query.page);

        const nextIDData = await sponsors.getNextID(req.query.page);

        res.render('view-sponsors', { currentRoute: '/view-sponsors', sponsors: sponsorsData.data, nextId: nextIDData.data[0].AUTO_INCREMENT });
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});

/**
 * Funcionalidades
 */

// SPONSORS
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
router.post('/remove-sponsor', async function (req, res, next) {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "The 'id' field is required" });
        }

        const result = await sponsors.removeSponsor(id);

        return res.redirect('/view-sponsors');
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});


// SECTIONS
router.post('/add-section', async function (req, res, next) {
    try {
        const { color, price, type } = req.body;

        if (!color) {
            return res.status(400).json({ error: "The 'color' field is required" });
        }

        if (!price) {
            return res.status(400).json({ error: "The 'price' field is required" });
        }

        if (!type) {
            return res.status(400).json({ error: "The 'type' field is required" });
        }

        // console.log('Data:', name);

        const result = await sections.postSection(color, price, type);

        return res.json({ success: result });
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});

router.post('/remove-section', async function (req, res, next) {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "The 'id' field is required" });
        }

        const result = await sections.removeSection(id);

        return res.json({ success: result });
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});

// POSITIONS
router.post('/add-position', async function (req, res, next) {
    try {
        const { id_canva, position_data, section_color, section_id } = req.body;

        if (!id_canva) {
            return res.status(400).json({ error: "The 'id_canva' field is required" });
        }
        if (!position_data) {
            return res.status(400).json({ error: "The 'position_data' field is required" });
        }
        if (!section_color) {
            return res.status(400).json({ error: "The 'section_color' field is required" });
        }
        if (!section_id) {
            return res.status(400).json({ error: "The 'section_id' field is required" });
        }

        const result = await positions.postPosition(id_canva, position_data, section_color, section_id);

        return res.json({ success: result });
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});

router.post('/remove-position', async function (req, res, next) {
    try {
        const { position_data } = req.body;

        if (!position_data) {
            return res.status(400).json({ error: "The 'position_data' field is required" });
        }

        const result = await positions.removePosition(position_data);

        return res.json({ success: result });
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});
router.post('/remove-position-id', async function (req, res, next) {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "The 'id' field is required" });
        }

        const result = await positions.removePositionById(id);

        return res.json({ success: result });
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});

router.post('/update-position', async function (req, res, next) {
    try {
        const { id, position_data_new } = req.body;

        if (!id) {
            return res.status(400).json({ error: "The 'id' field is required" });
        }

        if (!position_data_new) {
            return res.status(400).json({ error: "The 'position_data_new' field is required" });
        }

        const result = await positions.updatePosition(id,position_data_new);

        return res.json({ success: result });
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

        const result = await positions.updatePositionSponsor(id, sponsor_id);

        return res.json({ success: true, data: result });
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

        return res.json({ success: true, data: result });
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});


// CANVAS
router.post('/update-canvadata', async function (req, res, next) {
    try {
        const { id, data } = req.body;

        if (!id) {
            return res.status(400).json({ error: "The 'id' field is required" });
        }
        if (!data) {
            return res.status(400).json({ error: "The 'data' field is required" });
        }
        // console.log('Data:', name);

        const result = await canvas.updateCanvaData(id, data);

        return res.json({ success: true, data: result });
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});

router.get('/reload-canva-objects/:name', async function (req, res, next) {
    try {
        const { name } = req.params.name;

        const canvaData = await canvas.getCanvaByName(name);

        return res.json({ success: true, data: canvaData.data.objects });
    } catch (err) {
        console.error(`Error while posting data `, err.message);
        return next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});



module.exports = router;
