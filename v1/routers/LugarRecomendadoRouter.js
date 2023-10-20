const express = require('express');
const LugarRecomendadoController = require('../../controllers/LugarRecomendadoController');
const router = express.Router();

router
//endpoints de lugar Recomendado 
//este endpoint traee todos los tipos de LugarRecomendado
  .get('/getTodosLugarRecomendado', (req, res) => {
    LugarRecomendadoController.getLugarRecomendado((err, lugarRecomendados) => {
      if (err) {
        console.error('Error al encontrar todos los tipos de lugarrecomendado:', err.message);
        res.status(500).json({ error: 'Error al obtener tipos de lugares recomendados' });
      } else {
        if (lugarRecomendados && lugarRecomendados.length > 0) {
          console.log('Se encontraron tipos de lugares recomendados:', lugarRecomendados);
          res.status(200).json(lugarRecomendados);
        } else {
          console.log('No se encontraron lugares romendados');
          res.status(404).json({ message: 'No se encontraron lugares recomendados' });
        }
      }
    });
  })
   //devolver id de lugar recomendado segun nombre de lugar recomendado
  .get('/getLugarByNombreLugarRec', (req, res) => {
    const lugar = req.query.lugar;
    LugarRecomendadoController.getLugarRecomendadoByNombre(lugar,(err, lugarId) => {
      if (err) {
        console.error('Error al encontrar id de lugar rec:', err.message);
        res.status(500).json({ error: 'Error ' });
      } else {
        if (lugarId) {
          console.log('Se encontro lugar rec id:', lugarId);
          res.status(200).json(lugarId);
        } else {
          console.log('No se encontro');
          res.status(404).json({ message: 'No se encontro' });
        }
      }
    });
  });

module.exports = router;
  