const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

//creacion de lugarrecomendado --> puede ser restaurante, lugarturistico, ect
class LugarRecomendado {
    constructor(lugarRecomendado) {
      this.id = null;
      this.lugarRecomendado = lugarRecomendado;
 
    }
    
}

module.exports = LugarRecomendado;