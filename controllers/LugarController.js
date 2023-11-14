const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

class LugarController {
//metodo para traer lugar recomendado segun id
static getBanner(callback) {
  const sqlQuery = `SELECT TOP 5 a.id, a.foto, a.nombre, a.puntaje FROM Lugar a;`;
  executeSqlQueryGet(sqlQuery, (err, resultados) => {
    if (err) {
      callback(err);
    } else {
      if (resultados.length === 0) {
        callback(null, []);
      } else {
        const lugarC = [];
        for (let i = 0; i < resultados.length; i++) {
          const l = resultados[i];
          lugarC.push(l);
        }
        callback(null, lugarC);
      }
    }
  });
}
  static traerLugarSegunLugarRecomendadoId(id, callback) {
    const sqlQuery = `SELECT * FROM Lugar WHERE Lugar.idTipoLugar = '${id}'`;

    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        if (resultados.length === 0) {
          callback(null, []);
        } else {
          const lugarC = [];
          for (let i = 0; i < resultados.length; i++) {
            const l = resultados[i];
            lugarC.push(l);
          }

          callback(null, lugarC);
        }
      }
    });
  }

  //metodo para traer top5 de lugares

  static traerTop10Lugares(callback) {
    const sqlQuery = `SELECT TOP 5 * FROM Lugar WHERE LugarRecomendado.id = 1`;
    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        if (resultados.length == 0) {
          callback(null, []);

        } else {
          const lugarC = [];
          for (let i = 0; i < resultados.length; i++) {
            const l = resultados[i];
            lugarC.push(l);
          }
          callback(null, lugarC);
        }
      }
    })

  }
//metodo para traer top 5 de restaurantes
  static traerTop5SegunRestaurante(callback) {
    const sqlQuery = `SELECT TOP 5 Lugar.id, nombre, foto, puntaje, costo, distrito FROM Lugar
        INNER JOIN LugarRecomendado ON Lugar.idTipoLugar = LugarRecomendado.id
        INNER JOIN Distrito ON Lugar.idDistrito = Distrito.id
        where idTipoLugar = 1;`
    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        if (resultados.length == 0) {
          callback(null, []);

        } else {
          const lugarC = [];
          for (let i = 0; i < resultados.length; i++) {
            const l = resultados[i];
            lugarC.push(l);
          }
          callback(null, lugarC);
        }
      }
    })

  }

  //metodo prara traer top5 segun actividad
  static traerTop5SegunActividad(callback) {
    const sqlQuery = `SELECT TOP 5 Lugar.id, nombre, foto, puntaje, costo, distrito FROM Lugar
    INNER JOIN LugarRecomendado ON Lugar.idTipoLugar = LugarRecomendado.id
    INNER JOIN Distrito ON Lugar.idDistrito = Distrito.id
    where idTipoLugar = 2;`
    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        if (resultados.length == 0) {
          callback(null, []);

        } else {
          const lugarC = [];
          for (let i = 0; i < resultados.length; i++) {
            const l = resultados[i];
            lugarC.push(l);
          }
          callback(null, lugarC);
        }
      }
    })

  }

  //metodo para traer to5 srgun Lugar turistico

  static traerTop5SegunLugarTuristico(callback) {
    const sqlQuery = `SELECT TOP 5 Lugar.id, nombre, foto, puntaje, costo, distrito FROM Lugar
    INNER JOIN LugarRecomendado ON Lugar.idTipoLugar = LugarRecomendado.id
    INNER JOIN Distrito ON Lugar.idDistrito = Distrito.id
    where idTipoLugar = 3;`
    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        if (resultados.length == 0) {
          callback(null, []);

        } else {
          const lugarC = [];
          for (let i = 0; i < resultados.length; i++) {
            const l = resultados[i];
            lugarC.push(l);4
          }
          callback(null, lugarC);
        }
      }
    })

  }

  //metodo para traer todos los lugares

  static traerTodosLosLugares(callback) {
    const sqlQuery = `SELECT id, nombre, costo, linkweb, horaInicio, horaFin FROM Lugar`;
    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        const lugarC = resultados.map((row) => ({
          id: row.id,
          nombre: row.nombre,
          costo: row.costo,
          linkWeb: row.linkweb,
          horaInicio: row.horaInicio,
          horaFin: row.horaFin,
        }));

        callback(null, lugarC);
      }
    });
  }

  //metodo para traer lugar segun Id
  static traerLugarSegunId(id, callback) {
    const sqlQuery = `SELECT * FROM Lugar A WHERE A.id = ${id}`;
    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        if (resultados.length === 0) {
          callback(null, null);
        } else {
          const lugarC = resultados[0];
          callback(null, lugarC);
        }
      }
    });
  }


  //dar el id de lugar seleccionado

  //get lugar segun id

}

module.exports = LugarController;