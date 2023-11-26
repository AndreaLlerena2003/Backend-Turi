const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');

class LugarController {

static traerLugaresSegunNombre(nombre, callback) {
  const sqlQuery = `SELECT id, nombre FROM Lugar A WHERE A.nombre LIKE '%${nombre}%'`;
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
static traerLugaresPorFiltrado(idCategoriaPadre, idLugarRecomendado, idDistrito, callback) {
  let sqlQuery = `SELECT * FROM Lugar
  INNER JOIN LugarCategoria ON LugarCategoria.idLugar = Lugar.id
  INNER JOIN Categoria ON Categoria.id = LugarCategoria.idCategoria
  INNER JOIN CategoriaPadre ON Categoria.idCategoriaPadre = CategoriaPadre.idCategoriaPadre
  INNER JOIN LugarRecomendado ON LugarRecomendado.id = Lugar.idTipoLugar
  INNER JOIN Distrito ON Distrito.id = Lugar.idDistrito
  WHERE 1 = 1`;
  

  if (idCategoriaPadre) {
      sqlQuery += ` AND Categoria.idCategoriaPadre = ${idCategoriaPadre}`;
  }

  if (idDistrito) {
      sqlQuery += ` AND Distrito.id = ${idDistrito}`;
  }

  if (idLugarRecomendado) {
      sqlQuery += ` AND LugarRecomendado.id = ${idLugarRecomendado}`;
  }

  if (!idCategoriaPadre && !idLugarRecomendado && !idDistrito) {
      sqlQuery = `SELECT DISTINCT Lugar.*
      FROM Lugar
        INNER JOIN LugarCategoria ON LugarCategoria.idLugar = Lugar.id
        INNER JOIN Categoria ON Categoria.id = LugarCategoria.idCategoria
        INNER JOIN CategoriaPadre ON Categoria.idCategoriaPadre = CategoriaPadre.idCategoriaPadre
        INNER JOIN LugarRecomendado ON LugarRecomendado.id = Lugar.idTipoLugar
        INNER JOIN Distrito ON Distrito.id = Lugar.idDistrito;
      `;
  }

  console.log('SQL Query:', sqlQuery);

  executeSqlQueryGet(sqlQuery, (err,resultados)=>{
    if(err){
      callback(err);
    }else{
     
        const lugaresDeCategoria = resultados.map(row => ({ ...row }));
      callback(null, lugaresDeCategoria);
      
    }
  });
}


static getBanner(callback) {
  const sqlQuery = `SELECT TOP 5 a.id, a.foto, a.nombre, a.puntaje, a.fotobanner FROM Lugar a;`;
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
    const sqlQuery = `SELECT Lugar.id, foto, nombre, costo, linkweb, horaInicio, horaFin, lugar FROM Lugar
    INNER JOIN LugarRecomendado ON Lugar.idTipoLugar = LugarRecomendado.id`;
    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        const lugarC = resultados.map((row) => ({
          id: row.id,
          foto: row.foto,
          nombre: row.nombre,
          costo: row.costo,
          linkWeb: row.linkweb,
          horaInicio: row.horaInicio,
          horaFin: row.horaFin,
          lugar: row.lugar
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