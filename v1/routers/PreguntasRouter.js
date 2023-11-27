const express = require('express');
const PreguntasController = require('../../controllers/PreguntasController');
const router = express.Router();

router.get('/preguntas', (req, res) => {
    PreguntasController.getPreguntas((err, preguntas) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las preguntas frecuentes.' });
        } else {
            res.status(200).json(preguntas);
        }
    });
});

module.exports = router;
