const express = require('express');
const ReseñaController = require('../../controllers/ReseñaController');
const Reseña = require('../../clases/Reseña');
const router = express.Router();

router
    .post('/crearResena', (req, res) => {
    const reseña = {
      fechaCreacion: req.body.fechaCreacion,
      comentario: req.body.comentario,
      puntaje: req.body.puntaje,
      idUsuario: req.body.idUsuario,
      idLugar: req.body.idLugar
    };
  
    ReseñaController.registrarReseña(reseña, (err, nuevoIdReseña) => {
      if (err) {
        console.error('Error al registrar reseña:', err.message);
        res.status(500).json({ error: 'Error al registrar reseña.' });
      } else {
        console.log('Reseña registrada con éxito.');
        res.status(201).json({ nuevoIdReseña });
      }
    });
  })
  
  // Obtener todas las reseñas de un lugar
    .get('/obtenerResenasPorLugar', (req, res) => {
    const idLugar = req.query.idLugar;
  
    if (!idLugar) {
      return res.status(400).json({ error: 'El parámetro idLugar es requerido.' });
    }
  
    ReseñaController.obtenerReseñasPorLugar(idLugar, (err, reseñas) => {
      if (err) {
        console.error('Error al obtener las reseñas:', err.message);
        res.status(500).json({ error: 'Error al obtener las reseñas.' });
      } else {
        if (reseñas && reseñas.length > 0) {
          console.log('Se encontraron reseñas:', reseñas);
          res.status(200).json(reseñas);
        } else {
          console.log('No se encontraron reseñas para el lugar con ID:', idLugar);
          res.status(404).json({ message: 'No se encontraron reseñas para el lugar con ID proporcionado.' });
        }
      }
    });
  })
  
  // Eliminar una reseña
.delete('/eliminarPorLugar', (req, res) => {
    const idReseña = req.query.idReseña;
  
    if (!idReseña) {
      return res.status(400).json({ error: 'El parámetro idReseña es requerido.' });
    }
  
    ReseñaController.eliminarReseña(idReseña, (err, resultado) => {
      if (err) {
        console.error('Error al eliminar reseña:', err.message);
        res.status(500).json({ error: 'Error al eliminar reseña.' });
      } else {
        console.log(resultado.mensaje);
        res.status(200).json(resultado);
      }
    });
  })
  
  // Editar una reseña
  .put('/editar', (req, res) => {
    const idReseña = req.query.idReseña;
    const nuevoComentario = req.body.nuevoComentario;
    const nuevoPuntaje = req.body.nuevoPuntaje;
  
    if (!idReseña || !nuevoComentario || !nuevoPuntaje) {
      return res.status(400).json({ error: 'Los parámetros idReseña, nuevoComentario y nuevoPuntaje son requeridos.' });
    }
  
    ReseñaController.editarReseña(idReseña, nuevoComentario, nuevoPuntaje, (err, resultado) => {
      if (err) {
        console.error('Error al editar la reseña:', err.message);
        res.status(500).json({ error: 'Error al editar la reseña.' });
      } else {
        console.log('Reseña editada con éxito.');
        res.status(200).json(resultado);
      }
    });
  });
  

module.exports = router;