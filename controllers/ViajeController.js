const { executeSqlQuery, executeSqlQueryGet,executeSqlQueryWithGet } = require('../database/database');
const jwt = require('jsonwebtoken');//para manejo de tokens de inicio de sesion
//manejo de aleteoridad de clave secreta de tokens
//clase que controla al usuario 
const config = require('../database/config');
const secretKey= config.secretKey;
const verifyToken  = require('../middleware/auth');
//clase que se encarga de controllar el VIaje
class ViajeController {
//registro del viaje
    
  static registrarViaje(viaje, callback) {
    const insertQuery = `INSERT INTO Viaje (cantDias, idUsuario, nombre) OUTPUT INSERTED.id VALUES ('${viaje.cantDias}', '${viaje.idUsuario}','${viaje.nombre}');`

    executeSqlQueryWithGet(insertQuery, (err, result) => {
      if (err) {
        callback(err);
      } else {
        const nuevoIdViaje = result[0].id;
        callback(null, nuevoIdViaje);
      }
    });
    
  }
//obetenr viaje segun id de Usuario
static obtenerViajes(idUsuario, callback) {
  const sqlQuery = `SELECT * FROM VIAJE WHERE idUsuario = '${idUsuario}'`;

  executeSqlQueryGet(sqlQuery, (err, resultados) => {
    if (err) {
      console.error('Error al obtener los viajes:', err.message);
      return callback({ error: err.message });
    }

    if (resultados.length === 0) {
      console.log('No se encontró ningún viaje para el usuario.');
      return callback(null, null);
    }

   
    if (resultados.length > 1) {
      console.log('Se encontraron varios viajes para el usuario.');
      return callback(null, resultados);
    }});}

    static obtenerViajesDeUsuario(idUsuario, callback) {
      const sqlQuery = `SELECT id, cantDias, nombre FROM Viaje WHERE idUsuario = '${idUsuario}'`;
  
      executeSqlQueryGet(sqlQuery, (err, resultados) => {
          if (err) {
              console.error('Error al obtener los viajes del usuario:', err.message);
              return callback({ error: err.message });
          }
  
          console.log('Viajes obtenidos con éxito.');
          callback(null, resultados);
      });
  }
}

module.exports = ViajeController;
