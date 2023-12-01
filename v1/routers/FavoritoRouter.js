const express = require('express');
const FavoritoController = require('../../controllers/FavoritoController');
const Favorito = require('../../clases/Favorito');
const router = express.Router();
const config = require('../../database/config');
const secretKey= config.secretKey;
const verifyToken  = require('../../middleware/auth');

router
    //endpoint para agregar favorito para el usuario
    .post('/agregarFavorito', (req, res) => {
        const token = req.body.token;
        const result = verifyToken(token);
        if (result.error) {
            console.error('Error al verificar el token:', result.error.message);
            return res.status(401).send('Token no válido'); // Usar 401 Unauthorized para errores de autenticación.
        }
        const idUsuario = result.decoded.id;
        const favorito = new Favorito(idUsuario, req.body.idLugar);
    
        FavoritoController.registrarFavorito(favorito, (err, rowCount) => {
            if (err) {
                console.error('Error al registrar favorito:', err.message);
                return res.status(500).send('Error al registrar favorito.');
            }
    
            if (rowCount === 0) {
                console.log('El favorito ya existe.');
                return res.status(400).send('El favorito ya existe'); // Usar 400 Bad Request para datos duplicados.
            }
    
            console.log('Favorito registrado con éxito.');
            res.status(200).send('Favorito registrado con éxito.');
        });
    })

    //endpoint para traer todos los favoritos del usuario

    .get('/TraerTodosFav', (req, res) => {
        const token = req.query.token; 
    
        FavoritoController.traerTodosFavorito(token, (err, lugaresFavoritos) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: ';vvvvvvvvvvvv' });
        }
    
        if (!lugaresFavoritos) {
            console.log('troste.');
            return res.status(404).json({ message: 'pipi.' });
        }
    
        res.status(200).json(lugaresFavoritos);
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
      })

    // Ruta para verificar si un lugar es favorito para un usuario
    .get('/verificarFavorito', (req, res) => {
        const token = req.query.token; // Obtenemos el ID del usuario desde los parámetros de consulta
        const idLugar = req.query.idLugar; // Obtenemos el ID del lugar desde los parámetros de consulta
    
        FavoritoController.getFavorito(token, idLugar, (err, favorito) => {
        if (err) {
            console.error('Error al verificar si es favorito:', err.message);
            res.status(500).json({ resultado: 0, error: err.message });
        } else if (favorito) {
            console.log('El lugar es favorito para el usuario.');
            res.status(200).json({ resultado: 1 });
        } else {
            console.log('El lugar no es favorito para el usuario.');
            res.status(200).json({ resultado: 0 });
        }
        });
    })

    // Ruta para eliminar un favorito por ID de usuario e ID de lugar
    .delete('/eliminar', (req, res) => {
        const token = req.query.token; // ID del usuario
        const idLugar = req.query.idLugar; // ID del lugar
    
        FavoritoController.eliminarFavorito(token, idLugar, (err, resultado) => {
        if (err) {
            console.error('Error al eliminar favorito', err.message);
            res.status(500).json({ error: 'Error al eliminar favorito' });
        } else {
            if (resultado.mensaje === 'No se encontró el favorito para eliminar') {
            res.status(404).json({ mensaje: 'No se encontró el favorito para eliminar' });
            } else {
            res.status(200).json({ mensaje: 'Favorito eliminado con éxito' });
            }
        }
        });
    });

module.exports = router;
    