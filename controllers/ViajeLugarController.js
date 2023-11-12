const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
const config = require('../database/config');
const secretKey= config.secretKey;
const verifyToken  = require('../middleware/auth');
const jwt = require('jsonwebtoken');

//clase que maneja los Lugares asignados al viaje

class ViajeLugarController {
//se crea viaje vacio
  static viajeVacio(token, idViaje, callback) {
    const result = verifyToken(token);
    if (!result.error) {
      const idUsuario = result.decoded.id;
      const sqlQuery = `SELECT a.idViaje
        FROM ViajeLugar a
        WHERE a.idViaje = ${idViaje};`;
      executeSqlQueryGet(sqlQuery, (err, resultados) => {
        if (err) {
          callback(err, false);
        } else {
          if (resultados && resultados.length > 0) {
            callback(null, resultados);
          } else {
            callback(null, false);
          }
        }
      });
    } else {
      console.log('Token no válido');
    }
  }

  static traerItinerario(token, idViaje, callback) {
    const result = verifyToken(token);
    if (!result.error) {
      this.viajeVacio(token, idViaje, (err, vacio) => {
        if (err) {
          callback(err);
        } else {
          if (vacio != false) {
            const idUsuario = result.decoded.id;
            const sqlQuery = `SELECT a.*, b.idViaje, b.idLugar, b.id as idViajeLugar, b.numDia, c.nombre, c.foto
              FROM Viaje a
              INNER JOIN ViajeLugar b ON a.id = b.idViaje
              INNER JOIN Lugar c ON b.idLugar = c.id
              WHERE a.idUsuario = ${idUsuario} AND b.idViaje = ${idViaje};`;
  
            executeSqlQueryGet(sqlQuery, (err, resultados) => {
              if (err) {
                callback(err);
              } else {
                callback(null, resultados);
              }
            });
          } else {
            const sqlQuery = `SELECT b.cantDias FROM Viaje b
              WHERE b.id = ${idViaje};`;
  
            executeSqlQueryGet(sqlQuery, (err, resultados) => {
              if (err) {
                callback(err);
              } else {
                callback(null, resultados);
              }
            });
          }
        }
      });
    } else {
      callback('Token no válido');
    }
  }
  
  static crearRegistrosViajeLugarDos(data, callback) {
    const idViaje = data.data.idViaje;
    const numDia = data.data.numDia;
    const idLugar = data.data.idLugar;
    const sqlQuery = `INSERT INTO ViajeLugar (idViaje, numDia, idLugar) VALUES (${idViaje}, ${numDia}, ${idLugar})`;
  
    executeSqlQuery(sqlQuery, (err, result) => {
      if (err) {
        console.error('Error al crear registros de lugar en el viaje:', err.message);
        return callback(err);
      }
  
      console.log('Registros de lugar en el viaje creados con éxito.');
      callback(null, 'Registros creados exitosamente');
    });
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
