const express = require('express');
const ViajeLugarController = require('../../controllers/ViajeLugarController');
const ViajeLugar = require('../../clases/ViajeLugar');
const router = express.Router();

router
//endpoint para creacion de viaje agregar Lugar al viaje
    .post('/registro', (req, res) => {
        const nuevoViajeLugar = new ViajeLugar(
        req.body.idViaje,
        req.body.idLugar,
        req.body.idTiempoDia,
        req.body.numDia
        );
    
        ViajeLugarController.registrarViajeLugar(nuevoViajeLugar , (result) => {
        if (result.error) {
            console.error('Error al agregar registros de ViajeLugar:', result.error.message);
            res.status(500).json({error: 'Error al agregar registros de ViajeLugar.'});
        } else {
            console.log('Registros de ViajeLugar agregados con éxito.');
            res.status(200).json({ message: 'Registros de ViajeLugar agregados con éxito.' });
        }
        });
    })

    .post('/setIdLugar', (req, res) => {
        const { idLugar, idViaje, idTiempoDia, numDia } = req.body;
      
        ViajeLugarController.setIdLugar(idLugar, idViaje, idTiempoDia, numDia, (err) => {
          if (err) {
            console.error('Error al establecer el ID del lugar en ViajeLugar:', err.message);
            res.status(500).json({ error: 'Error al establecer el ID del lugar en ViajeLugar: ' + err.message });
          } else {
            console.log('ID del lugar establecido con éxito en ViajeLugar.');
            res.status(200).json({ message: 'ID del lugar establecido con éxito en ViajeLugar.' });
          }
        });
    });

module.exports = router;
      