const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//clase documento -- dni,pasaporte, etc
class Documento {
    constructor(documento) {
  
      this.id = null;
      this.documento = documento;
  
      }
    
}

module.exports = Documento;