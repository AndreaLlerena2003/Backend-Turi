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
    const itinerarioEstructurado = {
      data: { idViaje: '', cantDias: '', nombreViaje: '', dias: [] }
    };

    if (resultados && resultados.length > 0) {
      itinerarioEstructurado.data.idViaje = resultados[0].idViaje || '';
      itinerarioEstructurado.data.cantDias = resultados[0].cantDias || '';
      itinerarioEstructurado.data.nombreViaje = resultados[0].nombreViaje || '';
    }

    for (let i = 1; i <= itinerarioEstructurado.data.cantDias; i++) {
      itinerarioEstructurado.data.dias.push({ numDia: i, lugares: [] });
    }

    if (resultados && resultados.length > 0) {
      resultados.forEach((resultado) => {
        const { numDia, idLugar, nombre, foto, descripcion } = resultado;
        const lugar = { idLugar, nombre, foto, descripcion };

        const dia = itinerarioEstructurado.data.dias.find((d) => d.numDia === numDia);
        if (dia) {
          dia.lugares.push(lugar);
        }
      });
    }

    return itinerarioEstructurado;
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
      