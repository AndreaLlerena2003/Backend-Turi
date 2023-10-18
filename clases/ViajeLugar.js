const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//creacion de clase ViajeLugar
class ViajeLugar {
    constructor(idViaje,idLugar,idTiempoDia,numDia) {
      this.id = null;
      this.idViaje = idViaje;
      this.idLugar = idLugar;
      this.idTiempoDia = idTiempoDia;
      this.numDia = numDia;
 
    }
    
}

module.exports = ViajeLugar;