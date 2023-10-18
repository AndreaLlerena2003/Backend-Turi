const Lugar= require('../clases/Lugar');
const Actividad= require('../clases/Actividad');
const Restaurante= require('../clases/Restaurante');
const LugarTuristico= require('../clases/LugarTuristico');
const { executeSqlQuery } = require('../database/database');
//FABRICA DE LUGARES PARA LA CREACION DE LUGARES 
class LugarFactory {
    static crearLugar(idTipoLugar) {
      switch (idTipoLugar) {
        case 1:
          return new Restaurante();
        case 2:
          return new Actividad();
        case 3:
          return new LugarTuristico();
        default:
          return new Lugar();
      }
    }

    static registrarLugar(nuevoLugar, callback) {
        const sqlQuery = `
          INSERT INTO Lugar (descripcion, foto, puntaje, direccion, celular, linkweb, horaInicio, horaFin, nombre, costo, idDistrito, idTipoLugar, categoria)
          VALUES (
            '${nuevoLugar.descripcion}',
            '${nuevoLugar.foto}',
            ${nuevoLugar.puntaje},
            '${nuevoLugar.direccion}',
            '${nuevoLugar.celular}',
            '${nuevoLugar.linkWeb}',
            '${nuevoLugar.horarioInicio}',
            '${nuevoLugar.horaFin}',
            '${nuevoLugar.nombre}',
            ${nuevoLugar.costo},
            ${nuevoLugar.distrito},
            ${nuevoLugar.tipoLugar},
            '${nuevoLugar.categoria}'
          );
        `;
    
       
        executeSqlQuery(sqlQuery, callback);
      }
  }

module.exports = LugarFactory;