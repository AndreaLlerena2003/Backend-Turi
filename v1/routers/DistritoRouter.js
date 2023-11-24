const express = require('express');
const DistritoController = require('../../controllers/DistritoController');
const router = express.Router();

router
    .get('/getTodosDistritos', (req, res) => {
        DistritoController.getDistritos((err, distritos) => {
        if (err) {
            console.error('Error al encontrar todos los  distrito:', err.message);
            res.status(500).json({ error: 'Error al obtener distritos' });
        } else {
            if (distritos && distritos.length > 0) {
            console.log('Se encontraron distritos:', distritos);
            res.status(200).json(distritos);
            } else {
            console.log('No se encontraron distritos');
            res.status(404).json({ message: 'No se encontraron distritos' });
            }
        }
        });
    })

module.exports = router;