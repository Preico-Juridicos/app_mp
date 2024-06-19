const express = require('express');
const router = express.Router();
const sections = require('../services/sections');

router.get('/', async function (req, res, next) {
    try {
        const sectionsData = await sections.getMultiple(req.query.page);

        res.json(sectionsData.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las secciones');
    }
});

module.exports = router;
