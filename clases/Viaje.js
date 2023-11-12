const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//creacion de clase viaje
class Viaje {
    constructor(cantDias,idUsuario,nombre) {
      this.id = null;
      this.cantDias = cantDias;
      this.idUsuario = idUsuario;
      this.nombre = nombre;

    }
    
}

module.exports = Viaje;