const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
const config = require('../database/config');
const secretKey= config.secretKey;
const verifyToken  = require('../middleware/auth');
//clase que controlar los favoritos Lugares del Usuario
class FavoritoController {
//metodo para agregar a favorito
  
  static registrarFavorito(favorito, callback) {
    const sqlQuery = `SELECT id FROM Favorito WHERE idUsuario = '${favorito.idUsuario}' AND idLugar = '${favorito.idLugar}'`;

    executeSqlQueryGet(sqlQuery, (err, resultados) => {
        if (err) {
            callback(err);
        } else {
            if (resultados.length > 0) {
                // El favorito ya existe, no lo registramos de nuevo.
                callback(null, 0); // Indicamos que no se realizó ninguna inserción.
            } else {
                // El favorito no existe, lo registramos.
                const insertQuery = `INSERT INTO Favorito (idUsuario, idLugar) VALUES ('${favorito.idUsuario}', '${favorito.idLugar}')`;
                executeSqlQuery(insertQuery, callback);
            }
        }
    });
}

//metodo para traer el favorito segun idUsuario y el idLugar
  static getFavorito(token, idLugar, callback) {
    const result = verifyToken(token);
    if(!result.error){
    const idUsuario = result.decoded.id;
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
    })}else{
      console.log('Token no válido');
    }
  }

  //metodo para eliminar favorito segun idUsuario y idLugar

  static eliminarFavorito(token, idLugar, callback) {
    const result = verifyToken(token);
    if(!result.error){
    const idUsuario = result.decoded.id;
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
    });}else{
      console.log('Token no válido');
    }
  }
//metodo para traer todos los favoritos del usuario
  static traerTodosFavorito(token, callback) {
    const result = verifyToken(token);
    if(!result.error){
    const id = result.decoded.id;
    const sqlQuery = `SELECT Favorito.idLugar, Lugar.nombre, Lugar.foto, Lugar.descripcion FROM Lugar
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
    })}else{
      console.log("Token invalido");
    }};
  



}

module.exports = FavoritoController;