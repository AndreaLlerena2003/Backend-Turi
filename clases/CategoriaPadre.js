const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//creacion de clase categoria
class CategoriaPadre {
    constructor(categoriaPadre) {
      this.id = null;
      this.idCategoriaPadre = categoriaPadre.idCategoriaPadre;
      this.nom = categoriaPadre.nombreCategoriaPadre;
 
    }}