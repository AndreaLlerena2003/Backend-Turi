const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

class Reseña {
    constructor(fechaCreacion,comentario,puntaje) {
  
      this.id = null;
      this.fechaCreacion = fechaCreacion;
      this.comentario = comentario;
      this.puntaje = puntaje;
     
    }
}

module.exports = Reseña;