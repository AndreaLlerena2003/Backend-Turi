const express = require('express');
const ViajeController = require('../../controllers/ViajeController');
const Viaje = require('../../clases/Viaje');
const router = express.Router();


router
//crear intinerario funciones
    .post('/registro', (req, res) => {
        const viaje = new Viaje(
        req.body.cantDias,
        req.body.idUsuario
        );
    
        ViajeController.registrarViaje(viaje, (result) => {
        if (result.error) {
            console.error('Error al registrar el viaje:', result.error.message);
            res.status(500).send('Error al registrar el viaje.');
        } else {
            console.log('Viaje registrado con éxito.');
            res.status(200).json({ message: 'Viaje registrado con éxito.', idViaje: result.lastInsertId });
        }
        });
    })

    .post('/registrar', (req, res) => {
        const viaje = new Viaje(
          req.body.cantDias,
          req.body.idUsuario
        );
      
        ViajeController.registrarViaje(viaje, (err, nuevoIdViaje) => { // Elimina las llaves adicionales en la llamada a registrarViaje
          if (err) {
            console.error('Error al registrar el viaje:', err.message);
            res.status(500).json({ error: 'Error al registrar el viaje.' });
          } else {
            console.log('ce logro gentita:', nuevoIdViaje);
            res.status(200).json({ nuevoIdViaje });
          }
        });
      });

module.exports = router;
      