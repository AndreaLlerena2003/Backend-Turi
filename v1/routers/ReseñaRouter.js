const express = require('express');
const ReseñaController = require('../../controllers/ReseñaController');
const Reseña = require('../../clases/Reseña');
const router = express.Router();

router
    .post('/crearResena', (req, res) => {
        const reseña = new Reseña(
        req.body.fechaCreacion,
        req.body.comentario,
        req.body.puntaje
        );
    
        ReseñaController.registrarReseña(reseña, (err, rowCount) => {
        if (err) {
            console.error('Error al registrar reseña:', err.message);
            res.status(500).send('Error al registrar reseña.');
        } else {
            console.log('Reseña registrado con éxito.');
            res.status(200).send('Reseñan registrado con éxito.');
        }
        });
    });

module.exports = router;