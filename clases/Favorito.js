const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

class Favorito {
    constructor(idUsuario,idLugar) {
      this.id = null;
      this.idUsuario = idUsuario
      this.idLugar = idLugar;
    }
    
}

module.exports = Favorito;