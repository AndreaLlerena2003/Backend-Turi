const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
const config = require('../database/config');
const secretKey= config.secretKey;
const verifyToken  = require('../middleware/auth');
const jwt = require('jsonwebtoken');

//clase que maneja los Lugares asignados al viaje
class ViajeLugarController {
//se crea viaje vacio
    static traerItinerario(token,idViaje,callback){
      const result = verifyToken(token);
      if (!result.error) {
        const idUsuario = result.decoded.id;
        const sqlQuery = `SELECT a.*, b.*, c.nombre, c.foto
        FROM Viaje a
        INNER JOIN ViajeLugar b ON a.id = b.idViaje
        INNER JOIN Lugar c ON b.idLugar = c.id
        WHERE a.idUsuario = ${idUsuario} AND b.idViaje = ${idViaje};`;
        executeSqlQueryGet(sqlQuery,(err,resultados)=>{
          if(err){
            callback(err);
          }else{
            callback(null, resultados);
          }
        })
      }else{
        console.log('Token no valido');
      }

    }

    static crearRegistrosViajeLugarDos(data, callback) {
      const idViaje = data.data.idViaje;
      console.log(idViaje);
      const diasArray = data.data.dias;
      const insertQueries = [];
    
      for (const dia of diasArray) {
        const numDia = dia.numDia;
        const momentos = dia.momentos;
    
        for (const momento of momentos) {
          const idTiempoDia = momento.idTiempoDia;
          const lugares = momento.lugares;
    
          for (const lugar of lugares) {
            const idLugar = lugar.idLugar;
            insertQueries.push(
              `INSERT INTO ViajeLugar (idViaje, idLugar, idTiempoDia, numDia) VALUES (${idViaje}, ${idLugar}, ${idTiempoDia}, ${numDia});`
            );
          }
        }
      }
    
      async function executeQueries() {
        for (const query of insertQueries) {
          await new Promise((resolve) => {
            executeSqlQuery(query, (result) => {
              if (result && result.error) {
                callback(result);
              } else {
                resolve();
              }
            });
          });
        }
        callback({ message: 'Registros en ViajeLugar creados con éxito.' });
      }
    
      executeQueries();
    }
    
  

    
    //se setea id lugar
    static setIdLugar(idLugar,idViaje,idTiempoDia, numDia, callback){
        const sqlQuery = `UPDATE ViajeLugar SET idLugar = '${idLugar}' WHERE idViaje = '${idViaje}' 
        AND idTiempoDia = '${idTiempoDia}' AND numDia = '${numDia}'`;
        executeSqlQuery(sqlQuery, callback);
        console.log(sqlQuery);
        console.log('ce logro :0')
    }

    static registrarViajeLugar(viajeLugar, callback) {
        // Validar que idViaje sea válido
        const idViaje = viajeLugar.idViaje;
        const idTiempoDia = viajeLugar.idTiempoDia;
        const numDia = viajeLugar.numDia;

        // Validar que idViaje sea válido
        const validarIdViajeQuery = `SELECT id, cantDias FROM Viaje WHERE id = ${idViaje};`
        executeSqlQueryGet(validarIdViajeQuery, (err, resultadosViaje) => {
          if (err) {
            console.error('Error al validar el idViaje:', err.message);
            return callback({ error: err.message });
          } else if (resultadosViaje.length === 0) {
            return callback({ error: 'El idViaje no es válido.' });
          }

          // Validar que idTiempoDia sea un número entre 1 y 3
          if (idTiempoDia < 1 || idTiempoDia > 3) {
            return callback({ error: 'El idTiempoDia debe ser un número entre 1 y 3.' });
          }

          // Validar que numDia no sea mayor que cantDias
          const cantDiasViaje = resultadosViaje[0].cantDias;
          if (numDia > cantDiasViaje) {
            return callback({ error: 'El numDia no puede ser mayor que la cantidad de días del viaje.' });
          }

          // Insertar el registro de ViajeLugar
          const sqlQuery = `INSERT INTO ViajeLugar (idViaje, idLugar, idTiempoDia, numDia) VALUES (${idViaje}, ${viajeLugar.idLugar}, ${idTiempoDia}, ${numDia});`

          executeSqlQuery(sqlQuery, (err, result) => {
            if (err) {
              console.error('Error al registrar el ViajeLugar:', err.message);
              return callback({ error: err.message });
            }

            console.log('ViajeLugar registrado con éxito.');
            callback({ lastInsertId: result.lastInsertId });
          });
        });
      }
}

module.exports = ViajeLugarController;
