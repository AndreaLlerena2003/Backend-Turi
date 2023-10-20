const express = require('express');
const LugarController = require('../../controllers/LugarController');
const Lugar = require('../../clases/Lugar');
const router = express.Router();

router
 //devolver lugar segun id de lugar recomendado
    .get('/getLugarByIdLugarRec', (req, res) => {
        const id = req.query.id;
        LugarController.traerLugarSegunLugarRecomendadoId(id, (err, lugarC) => {
        if (err) {
            console.error('Error al encontrar lugar por ID de lugar recomendado:', err.message);
            res.status(500).json({ error: 'Error al obtener el lugar: ' + err.message });
        } else {
            if (lugarC && lugarC.length > 0) { 
            console.log('Se encontraron lugares según el ID de lugar recomendado:', lugarC);
            res.status(200).json(lugarC);
            } else {
            console.log('No se encontraron lugares para el ID de lugar recomendado proporcionado');
            res.status(404).json({ message: 'No se encontraron lugares para el ID de lugar recomendado proporcionado' });
            }
        }
        });
    })
    //traer los top 10 lugares
    .get('/getTopTen',(req,res) => {
        LugarController.traerTop10Lugares((err,lugarC)=>{
        if(err){
            console.error('Erro no econtramos top 10');
            res.status(500).json({errr: 'error al obtener top 10 ;v'+err.message});
        }else{
            if(lugarC && lugarC.length > 0){
            console.log('se encontraron lugares top 10: ',lugarC);
            res.status(200).json(lugarC);
    
            }else{
            console.log('no hay top 10');
            res.status(400).json({message: 'no hay ppipii'});
    
            }
        }
        })
    })
    
    
    
    //devolver lugar segun id de lugar recomendado
    .get('/getLugarById', (req, res) => {
        const id = req.query.id;
        LugarController.traerLugarSegunId(id, (err, lugarC) => {
        if (err) {
            console.error('Error al encontrar lugar por ID : ', err.message);
            res.status(500).json({ error: 'Error al obtener el lugar: ' + err.message });
        } else {
            if (lugarC) { 
            console.log('Se encontro según el ID :', lugarC);
            res.status(200).json(lugarC);
            } else {
            console.log('No se encontraro');
            res.status(404).json({ message: 'No se encontraron ' });
            }
        }
        });
    })
    
    
    //traer todos los lugares
    
    .get('/lugar/todos',(req,res) => {
        LugarController.traerTodosLosLugares((err,lugarC)=>{
        if(err){
            console.error('Error :v');
            res.status(500).json({errr: 'error ;vvvvvv'+err.message});
        }else{
            if(lugarC && lugarC.length > 0){
            console.log('se encontraron lugares : ',lugarC);
            res.status(200).json(lugarC);
    
            }else{
            console.log('no hay ;v ffff');
            res.status(400).json({message: 'no hay ppipii'});
    
            }
        }
        })
    })

    .get('/top5restaurantes', (req, res) => {
        LugarController.traerTop5SegunRestaurante((err, lugares) => {
          if (err) {
            console.error('Error al obtener los lugares', err);
            res.status(500).json({ error: 'Error al obtener los lugares' });
          } else {
            res.status(200).json(lugares);
          }
        });
      })
      
      
      //traer top 5 actividad
    .get('/top5Actividad', (req, res) => {
        LugarController.traerTop5SegunActividad((err, lugares) => {
          if (err) {
            console.error('Error al obtener los lugares s', err);
            res.status(500).json({ error: 'Error al obtener los lugares ' });
          } else {
            res.status(200).json(lugares);
          }
        });
      })
      
      //traer top 5 lugar turistico
    .get('/top5LugarTuristico', (req, res) => {
        LugarController.traerTop5SegunLugarTuristico((err, lugares) => {
          if (err) {
            console.error('Error al obtener los lugares', err);
            res.status(500).json({ error: 'Error al obtener los lugares ' });
          } else {
            res.status(200).json(lugares);
            console.log("HOLA")
          }
        });
      });
      

module.exports = router;
  