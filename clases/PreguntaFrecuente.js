const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//clase documento -- dni,pasaporte, etc
class PreguntaFrecuente {
    constructor(pregunta, respuesta) {
  
      this.id_preguntas = null;
      this.pregunta =pregunta;
      this.respuesta = respuesta;
  
      }
    
}

module.exports = PreguntaFrecuente;