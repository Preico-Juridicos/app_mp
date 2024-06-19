const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

// Renderiza la página principal
router.get('/', (req, res) => {
    pool.query('SELECT * FROM sections ORDER BY sections.price DESC', (err, sections) => {
        if (err) throw err;
        pool.query('SELECT * FROM sponsors', (err, sponsors) => {
            if (err) throw err;
            pool.query('SELECT * FROM positions', (err, positions) => {
                if (err) throw err;
                res.render('index', { sections, sponsors, positions });
            });
        });
    });

});


router.get('/view-sponsors', (req, res) => {
    pool.query('SELECT * FROM sponsors', (err, sponsors) => {
        if (err) throw err;
        // Obtener el próximo ID disponible
        pool.query('SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = "sponsors"', (err, result) => {
            if (err) throw err;
            const nextId = result[0].AUTO_INCREMENT;

            res.render('view-sponsors', { sponsors, nextId });
        });
    });
});

// Ruta para añadir un patrocinador
router.post('/add-sponsor', (req, res) => {
    const { name } = req.body;
    pool.query('INSERT INTO sponsors (name) VALUES (?)', [name], (err, result) => {
        if (err) throw err;
        res.redirect('/view-sponsors');
    });
});


// Ruta para actualizar el patrocinador
router.post('/update-position-sponsor', (req, res) => {
    const { id, sponsor_id } = req.body;
    pool.query('UPDATE positions SET sponsor_id = ? WHERE id = ?', [sponsor_id, id], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// Ruta para actualizar el patrocinador
router.post('/remove-position-sponsor', (req, res) => {
    const { id } = req.body;
    pool.query('UPDATE positions SET sponsor_id = null WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});




// router.post('/update-position/:id', (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     pool.query('UPDATE positions SET sponsor_id = (SELECT id FROM sponsors WHERE name = ?) WHERE id = ?', [name, id], (err, result) => {
//         if (err) throw err;
//         res.json({ success: true });
//     });
// });

// router.post('/update-price/:price', (req, res) => {
//     const { price } = req.params;
//     const { newPrice } = req.body;
//     pool.query('UPDATE sponsors SET price = ? WHERE price = ?', [newPrice, price], (err, result) => {
//         if (err) throw err;
//         res.json({ success: true });
//     });
// });

// Agregar más rutas para manejar CRUD de sponsors y positions...

module.exports = router;
