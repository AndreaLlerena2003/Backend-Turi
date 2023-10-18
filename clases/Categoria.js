const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//creacion de clase categoria
class Categoria {
    constructor(categoria) {
      this.id = null;
      this.categoria = categoria;
      this.lugaresCat = [];
 
    }
    //metodo que trae todas las categorias existentes
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

module.exports = Categoria;