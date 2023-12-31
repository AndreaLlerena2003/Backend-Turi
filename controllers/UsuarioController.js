const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//clase que controla al usuario 
class UsuarioController {
// metodo donde se registra al usuario
  static registrarUsuario(usuario, callback) {
    const sqlQuery = `INSERT INTO Usuario (nombre, apellido, correo, contraseña, usuario,celular,foto,idTipDoc,numDoc) VALUES 
    ('${usuario.nombre}', '${usuario.apellido}', '${usuario.correo}', '${usuario.contraseña}', '${usuario.usuario}', '${usuario.celular}', 
    '${usuario.foto}','${usuario.idTipDoc}','${usuario.numDoc}');`

    executeSqlQuery(sqlQuery, callback);
  }
  
  //metodo para inicio de sesion
    static iniciarSesion(usuario, contraseña, callback) {
        const sqlQuery = `SELECT * FROM Usuario WHERE usuario = '${usuario}' AND contraseña = '${contraseña}'`;

        executeSqlQueryGet(sqlQuery, (err, resultados) => {
          if (err) {
            callback(err);
          } else {
            if (resultados.length === 0) {
              callback(null, null); // usuario no encontrado
            } else {
              const usuarioEncontrado = resultados[0]; // el primer resultado es el usuario que inicia sesión
              callback(null, usuarioEncontrado);
            }
          }
        });
      }
//metodo para obtener datos del usuario
      static getDatosUsuario(id, callback) {
        const sqlQuery = `SELECT * FROM Usuario WHERE id = '${id}'`;
        executeSqlQueryGet(sqlQuery, (err, resultados) => {
          if (err) {
            callback(err);
          } else {
            if (resultados.length === 0) {
              callback(null, null); // usuario no encontrado
            } else {
              const usuarioEncontrado = resultados[0]; // el primer resultado es el usuario que inicia sesión
              callback(null, usuarioEncontrado);
            }
          }
        });
      }


      //metodo para traer usuario

      static getUsuario(id, callback){
        const sqlQuery = `SELECT usuario FROM Usuario WHERE id = '${id}'`;
        executeSqlQueryGet(sqlQuery, (err, resultados) => {
            if (err) {
              callback(err);
            } else {
              if (resultados.length === 0) {
                callback(null, null); // usuario no encontrado
              } else {
                const usuarioEncontrado = resultados[0]; // el primer resultado es el usuario que inicia sesión
                const nombreUsuario = usuarioEncontrado.usuario;
                callback(null, nombreUsuario);
              }
            }
          });
    }

//metodo para cambiar el nombre de usuario segun id 
static setUsuario(id,nombreUsuario, callback){
    const sqlQuery = `UPDATE Usuario SET usuario = '${nombreUsuario}' WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, callback);
    console.log(sqlQuery);
    console.log('ce logro :0')
}
//metodo para setear todos los datos del usuario
static setDatosUsuario(id, nuevoNombre, nuevoNombreUsuario, nuevoApellido, nuevoCorreo, nuevoCelular, nuevaFoto, callback) {
  const sqlQuery = `UPDATE Usuario SET 
    nombre = '${nuevoNombre}',
    usuario = '${nuevoNombreUsuario}',
    apellido = '${nuevoApellido}',
    correo = '${nuevoCorreo}',
    celular = '${nuevoCelular}',
    foto = '${nuevaFoto}'
    WHERE id = '${id}'`;
  
  executeSqlQuery(sqlQuery, callback);
  console.log(sqlQuery);
  console.log('ce logro :0');
}


//metodo para traer el nombre verdader0
    static getNombre(id, callback){
        const sqlQuery = `SELECT nombre FROM Usuario WHERE id = '${id}'`;
        executeSqlQueryGet(sqlQuery, (err, resultados) => {
            if (err) {
              callback(err);
            } else {
              if (resultados.length === 0) {
                callback(null, null); // usuario no encontrado
              } else {
                const usuarioEncontrado = resultados[0]; // el primer resultado es el usuario que inicia sesión
                const nombreUsuario = usuarioEncontrado.nombre;
                callback(null, nombreUsuario);
              }
            }
          });
    
    }

//metodo para setear el nombre oficial
static setNombreUsuario(id,nombreUsuarioOfical,callback){
    const sqlQuery = `UPDATE Usuario SET nombre = '${nombreUsuarioOfical}' WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, callback);
    console.log(sqlQuery);
    console.log('ce logro :0')
}

    //metodo get para traer el apellido 

    static getApellido(id, callback) {
        const sqlQuery = `SELECT apellido FROM Usuario WHERE id = '${id}'`;
        executeSqlQueryGet(sqlQuery, (err,resultados) => {
            if(err){
                callback(err);
            }else{
                if(resultados.length == 0){
                    callback(null,null);
                } else {
                    const usuarioEncontrado = resultados[0];
                    const apellidoUsuario = usuarioEncontrado.apellido;
                    callback(null,apellidoUsuario);
                }
            }
        })
    }

//metodo para setear el apellido 
static setApellido(id,apellido,callback){
    const sqlQuery = `UPDATE Usuario SET apellido = '${apellido}' WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, callback);
    console.log(sqlQuery);
    console.log('ce logro :0')
}

    static getCorreo(id, callback) {
        const sqlQuery = `SELECT correo FROM Usuario WHERE id = '${id}'`;
        executeSqlQueryGet(sqlQuery, (err,resultados) => {
            if(err){
                callback(err);
            }else{
                if(resultados.length == 0){
                    callback(null,null);
                } else {
                    const usuarioEncontrado = resultados[0];
                    const correoUsuario = usuarioEncontrado.correo;
                    callback(null,correoUsuario);
                }
            }
        })
    }

//metodo para setear el correo
    static setCorreo(id,correo,callback){
        const sqlQuery = `UPDATE Usuario SET correo = '${correo}' WHERE id = '${id}'`;
        executeSqlQuery(sqlQuery, callback);
        console.log(sqlQuery);
        console.log('ce logro :0')
    }

//metodo para setear el celular
static setCelular(id,celular,callback){
    const sqlQuery = `UPDATE Usuario SET celular = '${celular}' WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, callback);
    console.log(sqlQuery);
    console.log('ce logro :0')
}
//metodo para setear la foto
static setFoto(id,foto,callback){
    const sqlQuery = `UPDATE Usuario SET foto = '${foto}' WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, callback);
    console.log(sqlQuery);
    console.log('ce logro :0')
}
//get de su celular
    static getCelular(id, callback) {
        const sqlQuery = `SELECT celular FROM Usuario WHERE id = '${id}'`;
        executeSqlQueryGet(sqlQuery, (err,resultados) => {
            if(err){
                callback(err);
            }else{
                if(resultados.length == 0){
                    callback(null,null);
                } else {
                    const usuarioEncontrado = resultados[0];
                    const celularUsuario = usuarioEncontrado.celular;
                    callback(null,celularUsuario);
                }
            }
        })
    }
    static getFoto(id,callback){
        const sqlQuery = `SELECT foto FROM Usuario WHERE id = '${id}'`;
        executeSqlQueryGet(sqlQuery,(err,resultados) => {
            if(err){
                callback(err);
            }else{
                if(resultados.length == 0){
                    callback(null,null);
                }else{
                    const usuarioEncontrado = resultados[0]; //te retorna un objeto usuario
                    const fotoUsuario = usuarioEncontrado.foto; //mapeamos la foto
                    callback(null,fotoUsuario);
                }
            }
        })
    }

    
//get del tipo de documento del usuario
static getTipodeDoc(id, callback) {
    const sqlQuery = `SELECT documento FROM Documento INNER JOIN Usuario ON Documento.id = Usuario.idTipDoc WHERE Usuario.id = '${id}'`;
    executeSqlQueryGet(sqlQuery, (err, resultados) => {
        if (err) {
            callback(err);
        } else {
            console.log('Resultados de la consulta:', resultados); // Agrega esta línea para verificar los resultados
            if (resultados.length == 0) {
                callback(null, null);
            } else {
                const documentoEncontrado = resultados[0]; // Obtenemos el objeto tipo DOCUMENTO
                console.log('documentoEncontrado:', documentoEncontrado); // Agrega esta línea para verificar el objeto
                if (documentoEncontrado.hasOwnProperty('documento')) {
                    const tipoDocEncontrado = documentoEncontrado.documento; // Obtenemos la propiedad "documento"
                    callback(null, tipoDocEncontrado);
                } else {
                    callback(null, null); // Si "documento" no está presente en el objeto
                }
            }
        }
    });
}

//get del num de documento del usuario
static getnumDoc(id, callback){
    const sqlQuery = `SELECT numDoc FROM Usuario WHERE id = '${id}'`;
    executeSqlQueryGet(sqlQuery, (err, resultados) => {
        if (err) {
          callback(err);
        } else {
          if (resultados.length === 0) {
            callback(null, null); // usuario no encontrado
          } else {
            const usuarioEncontrado = resultados[0]; // el primer resultado es el usuario que inicia sesión
            const numDocUsuario = usuarioEncontrado.numDoc;
            callback(null, numDocUsuario);
          }
        }
      });
}

//set del num de documento del usuario
static setnumDoc(id,numDoc,callback){
    const sqlQuery = `UPDATE Usuario SET numDoc = '${numDoc}' WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, callback);
    console.log(sqlQuery);
    console.log('ce logro :0 kekeke')
}

//get de la contraseña del usuario
static getContrasena(id, callback){
  const sqlQuery = `SELECT contraseña FROM Usuario WHERE id = '${id}'`;
  executeSqlQueryGet(sqlQuery, (err, resultados) => {
      if (err) {
        callback(err);
      } else {
        if (resultados.length === 0) {
          callback(null, null); // usuario no encontrado
        } else {
          const usuarioEncontrado = resultados[0]; // el primer resultado es el usuario que inicia sesión
          const contraseñaUsuario = usuarioEncontrado.contraseña;
          callback(null, contraseñaUsuario);
        }
      }
    });
}


//set de lacontraseña del usuario

static setContrasena(id,contrasena,callback){
  const sqlQuery = `UPDATE Usuario SET contraseña = '${contrasena}' WHERE id = '${id}'`;
  executeSqlQuery(sqlQuery, callback);
  console.log(sqlQuery);
  console.log('ce logro :0 kekeke')
}




  }



  module.exports = UsuarioController;