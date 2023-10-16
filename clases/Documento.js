const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

class Documento {
    constructor(documento) {
  
      this.id = null;
      this.documento = documento;
  
      }
    
}

module.exports = Documento;