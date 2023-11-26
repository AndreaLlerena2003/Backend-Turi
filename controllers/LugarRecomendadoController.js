const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//clase controladora del lugar recomendado
class LugarRecomendadoController {
//metodo que trae todos los tipos de Lugar recomendado
    static getLugarRecomendado(callback) {
        const sqlQuery = `SELECT * FROM LugarRecomendado`;
        executeSqlQueryGet(sqlQuery, (err, resultados) => {
            if (err) {
                callback(err);
            } else {
                if (resultados.length == 0) {
                    callback(null, []); // no hay 
                } else {
                    const lugarRecomendados = [];
                    for (let i = 0; i < resultados.length; i++) {

                        const lug = resultados[i];
                        lugarRecomendados.push(lug); //
                    }
                    callback(null, lugarRecomendados);
                }
            }
        });
    }

    

    //devolver id de lugar recomendado segun nombre de lugar recomendado
    static getLugarRecomendadoByNombre(lugar,callback) {
        const sqlQuery = `SELECT id FROM LugarRecomendado WHERE LugarRecomendado.lugar = '${lugar}'`;
    
        executeSqlQueryGet(sqlQuery, (err, resultados) => {
            if (err) {
                callback(err);
            } else {
                if (resultados.length == 0) {
                    callback(null, null); // no hay 
                } else {
                    const lugares = resultados[0]; 
                    const lugarId = lugares.id;            
                    callback(null, lugarId);
                }
            }
        });
    }

    //traer lugares recomendades segun id de lugar recomendado
      
  }

  module.exports = LugarRecomendadoController;