const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

//clase que maneja las Reseñas
class ReseñaController {
//metodo para crar una reseña
    static registrarReseña(reseña, callback) {
      const sqlQuery = `INSERT INTO Reseña (fechaCreacion, comentario, puntaje) VALUES ('${reseña.fechaCreacion}', '${reseña.comentario}', '${reseña.puntaje}')`;
  
      executeSqlQuery(sqlQuery, callback);
    }
      
  }

  module.exports = ReseñaController;