const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

class ReseñaController {

    static registrarReseña(reseña, callback) {
      const sqlQuery = `INSERT INTO Reseña (fechaCreacion, comentario, puntaje) VALUES ('${reseña.fechaCreacion}', '${reseña.comentario}', '${reseña.puntaje}')`;
  
      executeSqlQuery(sqlQuery, callback);
    }
      
  }

  module.exports = ReseñaController;