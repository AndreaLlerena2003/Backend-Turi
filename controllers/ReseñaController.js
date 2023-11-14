const { executeSqlQuery, executeSqlQueryGet,executeSqlQueryWithGet } = require('../database/database');
const jwt = require('jsonwebtoken');//para manejo de tokens de inicio de sesion
//manejo de aleteoridad de clave secreta de tokens
//clase que controla al usuario 
const config = require('../database/config');
const secretKey= config.secretKey;
const verifyToken  = require('../middleware/auth');

//clase que maneja las Reseñas
class ReseñaController {
//metodo para crar una reseña
    static registrarReseña(reseña, callback) {
      const insertQuery = `INSERT INTO Reseña (idUsuario, idLugar, fechaCreacion, comentario, puntaje) OUTPUT INSERTED.id VALUES
      ('${reseña.idUsuario}', '${reseña.idLugar}','${reseña.fechaCreacion}', '${reseña.comentario}', '${reseña.puntaje}')`;
  
      executeSqlQueryWithGet(insertQuery, (err, result) => {
        if (err) {
          callback(err);
        } else {
          const nuevoIdReseña = result[0].id;
          callback(null, nuevoIdReseña);
        }
      });
      
    }
      
    static eliminarReseña(id, callback) {
      const sqlQuery = `DELETE FROM RESEÑA WHERE id = '${id}';`;
    
      executeSqlQuery(sqlQuery, (err, resultado) => {
        if (err) {
          callback(err);
        } else {
          if (resultado.affectedRows === 0) {
            callback(null, { mensaje: 'No se encontraron reseñas para eliminar' });
          } else {
            callback(null, { mensaje: 'Reseñas eliminadas exitosamente' });
          }
        }
      });
    }

    static obtenerReseñasPorLugar(idLugar, callback) {
      const sqlQuery = `
          SELECT RESEÑA.id as idReseña, RESEÑA.idLugar, RESEÑA.comentario, RESEÑA.fechaCreacion, RESEÑA.puntaje, USUARIO.*
          FROM RESEÑA
          INNER JOIN USUARIO ON RESEÑA.idUsuario = USUARIO.id
          WHERE RESEÑA.idLugar = '${idLugar}'
      `;
  
      executeSqlQueryGet(sqlQuery, (err, resultados) => {
          if (err) {
              console.error('Error al obtener las reseñas:', err.message);
              return callback({ error: err.message });
          }
  
          console.log('Reseñas obtenidas con éxito.');
          callback(null, resultados);
      });
  }  

    static editarReseña(idReseña, nuevoComentario, nuevoPuntaje, callback) {
      const sqlQuery = `UPDATE Reseña SET 
        comentario = '${nuevoComentario}',
        puntaje = ${nuevoPuntaje}
        WHERE id = ${idReseña}`;
    
      executeSqlQuery(sqlQuery, (err, resultado) => {
        if (err) {
          console.error('Error al editar la reseña:', err.message);
          callback(err);
        } else {
          console.log('Se editó la reseña con éxito.');
          callback(null, resultado);
        }
      });
    }
    
  }

  module.exports = ReseñaController;