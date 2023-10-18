const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//clase que controlar los favoritos Lugares del Usuario
class FavoritoController {
//metodo para agregar a favorito
  static registrarFavorito(favorito, callback) {
    const sqlQuery = `INSERT INTO Favorito (idUsuario, idLugar) VALUES ('${favorito.idUsuario}', '${favorito.idLugar}')`;

    executeSqlQuery(sqlQuery, callback);
  }
//metodo para traer el favorito segun idUsuario y el idLugar
  static getFavorito(idUsuario, idLugar, callback) {
    const sqlQuery = `SELECT * FROM Favorito WHERE idUsuario = ${ idUsuario } AND idLugar = ${ idLugar };`
    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        if (resultados.length == 0) {
          callback(null, null);

        } else {
          const lugarC = resultados[0];
          callback(null, lugarC);
        }
      }
    })
  }

  //metodo para eliminar favorito segun idUsuario y idLugar

  static eliminarFavorito(idUsuario, idLugar, callback) {
    const sqlQuery = `DELETE FROM Favorito WHERE idUsuario = ${idUsuario} AND idLugar = ${idLugar};`
    executeSqlQuery(sqlQuery, (err, resultado) => {
      if (err) {
        callback(err);
      } else {
        if (resultado.affectedRows === 0) {
          callback(null, { mensaje: 'No se encontró el favorito para eliminar' });
        } else {
          callback(null, { mensaje: 'Favorito eliminado exitosamente' });
        }
      }
    });
  }
//metodo para traer todos los favoritos del usuario
  static traerTodosFavorito(id, callback) {
    const sqlQuery = `SELECT Favorito.idLugar, Lugar.nombre FROM Lugar
      INNER JOIN Favorito ON Lugar.id = Favorito.idLugar
      INNER JOIN Usuario ON Favorito.idUsuario = Usuario.id
      WHERE Usuario.id = ${id};`

    executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        if (resultados.length === 0) {
          callback(null, null);
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



}

module.exports = FavoritoController;