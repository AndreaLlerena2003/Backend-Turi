const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//creacion de clase reseña
class Reseña {
    constructor(fechaCreacion,comentario,puntaje,idUsuario,idLugar) {
  
      this.id = null;
      this.fechaCreacion = fechaCreacion;
      this.comentario = comentario;
      this.puntaje = puntaje;
      this.idUsuario = idUsuario;
      this.idLugar = idLugar
     
    }
}

module.exports = Reseña;