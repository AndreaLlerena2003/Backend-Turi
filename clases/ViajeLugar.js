const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

class ViajeLugar {
    constructor(idViaje,idTiempoDia,numDia) {
      this.id = null;
      this.idViaje = idViaje;
      this.idLugar = null;
      this.idTiempoDia = idTiempoDia;
      this.numDia = numDia;
 
    }
    
}

module.exports = ViajeLugar;