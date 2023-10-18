const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');


//creacion de tiempoDia --> tiempo del dia para itinerario (mañana,tarde,noche)
class TiempoDia {
    constructor() {
      this.id = null;
      this.tiempoDia = null;
    }
}