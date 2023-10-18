const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//creacion de clase viaje
class Viaje {
    constructor(cantDias,idUsuario) {
      this.id = null;
      this.cantDias = cantDias;
      this.idUsuario = idUsuario;
    }
    
}

module.exports = Viaje;