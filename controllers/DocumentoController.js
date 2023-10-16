const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

class DocumentoController {

    //traer nombre de tipo de documento segun id buscado
    static getDocumento(id, callback){
        const sqlQuery = `SELECT documento FROM Documento WHERE id = '${id}'`;
        executeSqlQueryGet(sqlQuery,(err,resultados) => {
         if(err){
             callback(err);
         }else{
             if(resultados.length == 0){
                 callback(null, null); // usuario no encontrado
             }
             else{
                 const documentoEncontrado = resultados[0]; 
                 const nombreDocumento = documentoEncontrado.documento;
                 callback(null, nombreDocumento);
 
             }
         }
        })
     }
 
     //traer todos los tipos de documento
     static getTodosDocumentos(callback){
             const sqlQuery = `SELECT * FROM Documento`;
             executeSqlQueryGet(sqlQuery,(err,resultados) => {
              if(err){
                  callback(err);
              }else{
                  if(resultados.length == 0){
                      callback(null, []); // no se encontraron documentos
                  }
                  else{
                     const documentos = [];
                     for (let i = 0; i < resultados.length; i++) {
                         const doc = resultados[i].documento;
                         documentos.push(doc);
                     }
 
                     callback(null, documentos);
      
                  }
              }
             })
     }
      
  }

  module.exports = DocumentoController;