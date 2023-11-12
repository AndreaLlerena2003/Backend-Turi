const express = require('express');
const ViajeLugarController = require('../../controllers/ViajeLugarController');
const ViajeLugar = require('../../clases/ViajeLugar');
const router = express.Router();

router

   
.post('/registro', (req, res) => {
  const data = req.body; 
  ViajeLugarController.crearRegistrosViajeLugarDos(data, (error, mensaje) => {
    if (error) {
      return res.status(500).json({ error: 'Hubo un error al crear los registros de lugar en el viaje.' });
    }

    res.status(200).json({ message: mensaje });
  });
})

  .get('/traerItinerarioPorId', (req, res) => {
    const token = req.query.token;
    const idViaje = req.query.idViaje;
  
    ViajeLugarController.traerItinerario(token, idViaje, (err, resultados) => {
      if (err) {
        console.error('Error al encontrar itinerario', err.message);
        res.status(500).json('Error al buscar el itinerario.');
      } else {
        const formattedData = formatResponse(resultados);
        res.status(200).json(formattedData);
      }
    });
  
    function formatResponse(resultados) {
      if (!resultados || resultados.length === 0) {
        return { data: { idViaje: '', cantDias: '', nombreViaje: '',dias: [] } };
      }
  
      const data = { idViaje: resultados[0].idViaje || '', cantDias: resultados[0].cantDias || '', nombreViaje: resultados[0].nombreViaje  || '',dias: [] };
  
      resultados.forEach((resultado) => {
        const { numDia, idLugar, nombre, foto } = resultado;
        const lugar = { idLugar, nombre, foto };
  
        const dia = data.dias.find((d) => d.numDia === numDia);
        if (dia) {
          dia.lugares.push(lugar);
        } else {
          data.dias.push({ numDia, lugares: [lugar] });
        }
      });
  
      return { data };
    }
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
      