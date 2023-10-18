const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//mientras puntajes seteados
//creacion de tabla lugar
class Lugar {

    constructor() {
      this.id = null;
      this.descripcion = null;
      this.foto = null;
      this.puntaje = null;
      this.direccion = null;
      this.celular = null;
      this.linkWeb = null;
      this.horarioInicio = null;
      this.horaFin = null;
      this.nombre = null;
      this.costo = null;
      this.distrito = null;
      this.tipoLugar = null;
      this.categoria = []; 
    }

}

module.exports = Lugar;
  
/*SELECT * FROM Lugar WHERE id = 2;*/