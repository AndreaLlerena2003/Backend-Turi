const express = require('express');
const FavoritoController = require('../../controllers/FavoritoController');
const Favorito = require('../../clases/Favorito');
const router = express.Router();

router
    //endpoint para agregar favorito para el usuario
    .post('/agregarFavorito', (req, res) => {
        const favorito = new Favorito(
        req.body.idUsuario,
        req.body.idLugar
        );
    
        FavoritoController.registrarFavorito(favorito, (err, rowCount) => {
        if (err) {
            console.error('Error al registrar favorito:', err.message);
            res.status(500).send('Error al registrar favorito.');
        } else {
            console.log('favorito registrado con éxito.');
            res.status(200).send('favorito registrado con éxito.');
        }
        });
    })

    //endpoint para traer todos los favoritos del usuario

    .get('/TraerTodosFav', (req, res) => {
        const id = req.query.id; 
    
        FavoritoController.traerTodosFavorito(id, (err, lugaresFavoritos) => {
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

    // Ruta para verificar si un lugar es favorito para un usuario
    .get('/verificarFavorito', (req, res) => {
        const idUsuario = req.query.idUsuario; // Obtenemos el ID del usuario desde los parámetros de consulta
        const idLugar = req.query.idLugar; // Obtenemos el ID del lugar desde los parámetros de consulta
    
        FavoritoController.getFavorito(idUsuario, idLugar, (err, favorito) => {
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
        const idUsuario = req.query.idUsuario; // ID del usuario
        const idLugar = req.query.idLugar; // ID del lugar
    
        FavoritoController.eliminarFavorito(idUsuario, idLugar, (err, resultado) => {
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
    