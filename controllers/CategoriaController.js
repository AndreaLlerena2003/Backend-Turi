const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//creacin de contorllador para manejar la clase Categoria
class CategoriaController {
//metodo para traer el get --> de todas los tipos de categoria
    static getCategorias(callback) {
        const sqlQuery = `SELECT * FROM Categoria`;
        executeSqlQueryGet(sqlQuery, (err, resultados) => {
            if (err) {
                callback(err);
            } else {
                if (resultados.length == 0) {
                    callback(null, []); // no hay categorías
                } else {
                    const categorias = [];
                    for (let i = 0; i < resultados.length; i++) {

                        const cat = resultados[i].categoria;
                        categorias.push(cat); //
                    }
                    callback(null, categorias);
                }
              
            }
        });
    }
      
  }

  module.exports = CategoriaController;