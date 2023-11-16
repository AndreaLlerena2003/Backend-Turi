const express = require('express');
const ViajeController = require('../../controllers/ViajeController');
const Viaje = require('../../clases/Viaje');
const router = express.Router();
const config = require('../../database/config');
const secretKey= config.secretKey;
const verifyToken  = require('../../middleware/auth');

router
//crear intinerario funciones
    .post('/registro', (req, res) => {
        const token = req.body.token;
        const result = verifyToken(token);
        console.log(result);
        if (result.error) {
          console.error('Error al verificar el token:', result.error.message);
          return res.status(401).json('Token no válido'); 
        }
        const idUsuario = result.decoded.id;
        const nombre = req.body.nombre;
        const viaje = new Viaje(
          req.body.cantDias,
          idUsuario,
          nombre
        );
        ViajeController.registrarViaje(viaje, (err,nuevoIdViaje) => {
        if (err) {
            console.error('Error al registrar el viaje:', err);
            res.status(500).json('Error al registrar el viaje.');
        } else {
            console.log('Viaje registrado con éxito.');
            res.status(200).json({ message: 'Viaje registrado con éxito.', idViaje: nuevoIdViaje });
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
      })

      .get('/traerViajes', (req, res) => {
        const token = req.query.token;
        const result = verifyToken(token);
        if (result.error) {
          console.error('Error al verificar el token:', result.error.message);
          return res.status(401).json('Token no válido'); // Usar 401 Unauthorized para errores de autenticación.
        }
        const idUsuario = result.decoded.id;
        ViajeController.obtenerViajesDeUsuario(idUsuario, (error, viajes) => {
          if (error) {
            return res.status(500).json({ error: 'Hubo un error al obtener los viajes.' });
          }
      
          if (!viajes) {
            return res.status(404).json({ message: 'No se encontraron viajes para este usuario.' });
          }
      
          res.status(200).json({ viajes });
        });
      });

module.exports = router;
      