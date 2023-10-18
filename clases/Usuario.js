const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//creacion de clase usuario
class Usuario {
    constructor(nombre, apellido, correo, contraseña,usuario,celular,foto,idTipDoc,numDoc) {
  
      this.id = null;
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.contraseña = contraseña;
      this.usuario = usuario;
      this.celular = celular;
      this.foto = foto;
      this.idTipDoc = idTipDoc;
      this.numDoc = numDoc;
      
    }

 
  }

  module.exports = Usuario;