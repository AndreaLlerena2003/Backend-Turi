const { executeSqlQuery, executeSqlQueryGet,executeSqlQueryWithGet } = require('../database/database');
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
    }

   
    const viajeEncontrado = resultados[0];
    console.log('Viaje obtenido con éxito.');
    callback(null, viajeEncontrado);
  });
}
}

module.exports = ViajeController;
