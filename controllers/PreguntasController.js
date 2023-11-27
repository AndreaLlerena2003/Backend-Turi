const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//clase controladora del lugar recomendado
class PreguntasController {
//metodo que trae todos los tipos de Lugar recomendado
    static getPreguntas(callback) {
        const sqlQuery = `SELECT * FROM PreguntasFrecuentes`;
        executeSqlQueryGet(sqlQuery, (err, resultados) => {
            if (err) {
                callback(err);
            } else {
                if (resultados.length == 0) {
                    callback(null, []); // no hay 
                } else {
                    const preguntas = [];
                    for (let i = 0; i < resultados.length; i++) {

                        const pre = resultados[i];
                        preguntas.push(pre); //
                    }
                    callback(null, preguntas);
                }
            }
        });
    }

      
  }

  module.exports = PreguntasController;