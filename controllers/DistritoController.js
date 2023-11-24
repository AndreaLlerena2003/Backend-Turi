const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//creacin de contorllador para manejar la clase Categoria
class DistritoController {
//metodo para traer el get --> de todas los tipos de categoria
    static getDistritos(callback) {
        const sqlQuery = `SELECT id,distrito FROM Distrito`;
        executeSqlQueryGet(sqlQuery, (err, resultados) => {
            if (err) {
                callback(err);
            } else {
                if (resultados.length == 0) {
                    callback(null, []); // 
                } else {
                    const distritos = [];
                    for (let i = 0; i < resultados.length; i++) {

                        const dis = resultados[i];
                        console.log(dis);
                        distritos.push(dis); //
                    }
                    callback(null, distritos);
                }
              
            }
        });
    }
      
  }

  module.exports = DistritoController;