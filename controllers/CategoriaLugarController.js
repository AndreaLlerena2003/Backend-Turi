const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

class CategoriaLugarController {
  
    static traerLugaresSegunCategoria(categoria, callback) {
        const sqlQuery = `SELECT * FROM Lugar 
        INNER JOIN LugarCategoria
        ON LugarCategoria.idLugar = Lugar.id
        INNER JOIN Categoria
        ON Categoria.id = LugarCategoria.idCategoria 
        WHERE Categoria.categoria = '${categoria}'`;   
      
        executeSqlQueryGet(sqlQuery, (err, resultados) => {
          if (err) {
            callback(err);
          } else {
            if (resultados.length === 0) {
              callback(null, []); // usuario no encontrado
            } else {
              const lugaresDeCategoria = [];
              for (let i = 0; i < resultados.length; i++) {
                const luCat = resultados[i];
                lugaresDeCategoria.push(luCat); //
            }
              callback(null, lugaresDeCategoria);
            }
          }
        });
      }

      static getCategoriasPorLugar(idLugar, callback) {
        const sqlQuery = 
        `SELECT *
          FROM Categoria AS C
          JOIN LugarCategoria AS LC ON C.id = LC.idCategoria
          WHERE LC.idLugar = ${idLugar};`
        ;

        executeSqlQueryGet(sqlQuery, (err, resultados) => {
          if (err) {
            callback(err);
          } else {
            callback(null, resultados);
          }
        });
      }
      
      static traerLugaresSegunCategoriaId(categoriaId, callback) {
        const sqlQuery = `SELECT * FROM Lugar 
        INNER JOIN LugarCategoria
        ON LugarCategoria.idLugar = Lugar.id
        INNER JOIN Categoria
        ON Categoria.id = LugarCategoria.idCategoria 
        WHERE Categoria.id = '${categoriaId}'`;   
      
        executeSqlQueryGet(sqlQuery, (err, resultados) => {
          if (err) {
            callback(err);
          } else {
            if (resultados.length === 0) {
              callback(null, []); 
            } else {
              const lugaresDeCategoria = [];
              for (let i = 0; i < resultados.length; i++) {
                const luCat = resultados[i];
                lugaresDeCategoria.push(luCat); //
            }
              callback(null, lugaresDeCategoria);
            }
          }
        });
      }
      

  }

  module.exports =  CategoriaLugarController;