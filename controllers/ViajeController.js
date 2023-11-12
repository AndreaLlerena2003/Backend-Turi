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
    const insertQuery = `INSERT INTO Viaje (cantDias, idUsuario) OUTPUT INSERTED.id VALUES ('${viaje.cantDias}', '${viaje.idUsuario}');`

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
  static obtenerViaje(idUsuario, callback) {
    const sqlQuery = `SELECT * FROM VIAJE WHERE idUsuario = '${idUsuario}'`;

    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        console.error('Error al obtener el viaje:', err.message);
        return callback({ error: err.message });
      }

      if (resultados.length === 0) {
        console.log('No se encontró ningún viaje para el usuario.');
        return callback(null, null);
      }

      // Supongo que solo se espera un viaje por usuario, por lo que tomo el primer resultado
      const viajeEncontrado = resultados[0];

      console.log('Viaje obtenido con éxito.');
      callback(null, viajeEncontrado);
    });
  }

  static obtenerViajesDeUsuario(token, callback) {
    const result = verifyToken(token);
  
    if (!result.error) {
      const idUsuario = result.decoded.id;
      const sqlQuery = `SELECT id, cantDias FROM Viaje WHERE idUsuario = '${idUsuario}'`;
  
      executeSqlQueryGet(sqlQuery, (err, resultados) => {
        if (err) {
          console.error('Error al obtener los viajes del usuario:', err.message);
          return callback({ error: err.message });
        }
  
        console.log('Viajes obtenidos con éxito.');
        callback(null, resultados);
      });
    } else {
      console.log('Token no válido');
      callback({ error: 'Token no válido' });
    }
  }
}

module.exports = ViajeController;
