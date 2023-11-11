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
          const original = { data: resultados };
          const bonito = { //data tendra como inicio el valor de idViaje 
            "data": {
              "idViaje": original.data[0].idViaje,
              "dias": [] //y tmb tendra un array de dias 
            }
          };
          const diasMapeados = new Map();
          original.data.forEach((item)=>{//por cada objeto del MAPA
            if(!diasMapeados.has(item.numDia)){ //si los dias mapeados no tiene un la llave del numDia
              diasMapeados.set(item.numDia,{
                numDia: item.numDia, //se setea el valor del numDia como nueva clave
                momentos:[] //momentos sera un array de lugares de ese dia
              })
            }
            diasMapeados.get(item.numDia).momentos.push({ //se llena el array de momentos con los datos del tiempoDia respectivo y la info del lugar
              idTiempoDia: item.idTiempoDia,
              lugares:[
                {
                  idLugar:item.idLugar,
                  nombre:item.nombre,
                  foto:item.foto
                }
              ]
            });
          });

          diasMapeados.forEach((day) => { //cada dia mapeado se agrega al json ahora bonito 
            bonito.data.dias.push(day);

          });

          res.status(200).json(bonito); //enviamos el json que ahora esta mas bonito que el anterior
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
      