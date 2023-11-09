const express = require('express');
const ViajeLugarController = require('../../controllers/ViajeLugarController');
const ViajeLugar = require('../../clases/ViajeLugar');
const router = express.Router();

router
//endpoint para creacion de viaje agregar Lugar al viaje
   
    .post('/registro', (req, res) => {
      
      const data = req.body;
  
      ViajeLugarController.crearRegistrosViajeLugarDos(data, (result) => {
          if (result instanceof Error) {
              console.error('Error al agregar registros de ViajeLugar:', result.message);
              res.status(500).json({ error: 'Error al agregar registros de ViajeLugar.' });
          } else {
              console.log('Registros de ViajeLugar agregados con éxito.');
              res.status(200).json({ message: 'Registros de ViajeLugar agregados con éxito.' });
          }
      });
  })

  .get('/traerItinerarioPorId',(req,res)=>{
    const token = req.query.token;
    const idViaje = req.query.idViaje
    ViajeLugarController.traerItinerario(token,idViaje,(err, resultados) => {
      if(err){
        console.error('Error al encontrar usuario', err.message);
        res.status(500).json('Error.');
      }else{
        if(resultados){
          console.log('Se encontró itinerario');
          console.log('resultados:' + resultados);
          res.status(200).json({data: resultados});
        }else{
          console.log('Itinaerio no encontrado');
          res.status(401).send('itinerario no encontrado');
        }
      }
    })
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
      