const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
const jwt = require('jsonwebtoken');//para manejo de tokens de inicio de sesion
//manejo de aleteoridad de clave secreta de tokens
//clase que controla al usuario 
const config = require('../database/config');
const secretKey= config.secretKey;
const verifyToken  = require('../middleware/auth');


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
              return callback(new Error('Usuario no encontrado'), null);
              //callback(null, null); // usuario no encontrado
            } else {
              const usuarioEncontrado = resultados[0]; // el primer resultado es el usuario que inicia sesión
            try{
             
              const token = jwt.sign({ 
                id: usuarioEncontrado.id, 
                usuario: usuarioEncontrado.usuario,
                exp: Math.floor(Date.now() / 1000) + (180 * 60) // El token expira en 3 horas
            }, secretKey);

              callback(null, usuarioEncontrado, {token: token});
            }catch(error){
              console.error('Error al generar el token:', error.message);
              callback(new Error('Error al generar el token.'));
            }}
          }
        });
      }
//metodo para obtener datos del usuario
static getDatosUsuario(token, callback) {
  try {
     
      const result = verifyToken(token);
      if(!result.error){
      const userId = result.decoded.id;
      console.log('ID del usuario:', userId);
      const sqlQuery = `SELECT * FROM Usuario WHERE id = '${userId}'`;
      executeSqlQueryGet(sqlQuery, (err, resultados) => {
          if (err) {
              callback(err);
          } else {
              if (resultados.length === 0) {
                  callback(null, null); // Usuario no encontrado
              } else {
                  const usuarioEncontrado = resultados[0]; // El primer resultado es el usuario
                  callback(null, usuarioEncontrado);
              }
          }
      })}
      else{
        console.log('Token no válido');
      };
  } catch (error) {
      console.error('Error al decodificar el token:', error.message);
      callback(new Error('Error al decodificar el token.'));
  }
}

      //metodo para traer usuario

  static getUsuario(token, callback){
        const result = verifyToken(token);
        if(!result.error){
        const id = result.decoded.id;
        console.log('ID del usuario:', id);
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
          })}else{
            console.log('Token no válido');
          };
  }

//metodo para cambiar el nombre de usuario segun id 
static setUsuario(token,nombreUsuario, callback){
    const result = verifyToken(token);
    if(!result.error){
    const id = result.decoded.id;
    const sqlQuery = `UPDATE Usuario SET usuario = '${nombreUsuario}' WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, (err, resultado) => {
      if (err) {
          console.error('Error al actualizar el nombre de usuario:', err.message);
          callback(err);
      } else {
          console.log('Se actualizó el nombre de usuario con éxito.');
          callback(null, resultado);
      }
  });}
    else{
      console.log('Token no válido');
    }
}
//metodo para setear todos los datos del usuario
static setDatosUsuario(token, nuevoNombre, nuevoNombreUsuario, nuevoApellido, nuevoCorreo, nuevoCelular, nuevaFoto, callback) {
  const result = verifyToken(token);
  if (!result.error) {
    const id = result.decoded.id;
    const sqlQuery = `UPDATE Usuario SET 
      nombre = '${nuevoNombre}',
      usuario = '${nuevoNombreUsuario}',
      apellido = '${nuevoApellido}',
      correo = '${nuevoCorreo}',
      celular = '${nuevoCelular}',
      foto = '${nuevaFoto}'
      WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, (err, resultado) => {
      if (err) {
        console.error('Error al actualizar todos los datos:', err.message);
        callback(err);
      } else {
        console.log('Se actualizó todos los datos con éxito.');
        callback(null, resultado);
      }
    });
  } else {
    console.log('Token no válido');
    callback(new Error('Token no válido'));
  }
}



//metodo para traer el nombre verdader0
    static getNombre(token, callback){
      const result = verifyToken(token);
      if (!result.error) {
        const id = result.decoded.id;
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
        }else{
          console.log('Token no válido');
          callback(new Error('Token no válido'));
        }
    
    }

//metodo para setear el nombre oficial
static setNombreUsuario(token,nombreUsuarioOfical,callback){
    const result = verifyToken(token);
    if(!result.error){
      const id = result.decoded.id;
      const sqlQuery = `UPDATE Usuario SET nombre = '${nombreUsuarioOfical}' WHERE id = '${id}'`;
      executeSqlQuery(sqlQuery, callback);
      console.log(sqlQuery);
      console.log('ce logro :0')}else{
        console.log('Token no válido');
      }
}

    //metodo get para traer el apellido 

  static getApellido(token, callback) {
        const result = verifyToken(token);
      if(!result.error){
        const id = result.decoded.id;
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
        })}
        else{
          console.log('Token no válido');
        }
    }

//metodo para setear el apellido 
static setApellido(token,apellido,callback){
   const result = verifyToken(token);
   if(!result.error){
    const id = result.decoded.id;
    const sqlQuery = `UPDATE Usuario SET apellido = '${apellido}' WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, callback);
    console.log(sqlQuery);
    console.log('ce logro :0')}else{
      console.log('Token no válido');
    }
}

    static getCorreo(token, callback) {
        const result = verifyToken(token);
        if(!result.error){
        const id = result.decoded.id;
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
        })}else{
          console.log('Token no válido');
        }
    }

//metodo para setear el correo
    static setCorreo(token,correo,callback){
        const result = verifyToken(token);
        if(!result.error){
        const id = result.decoded.id;
        const sqlQuery = `UPDATE Usuario SET correo = '${correo}' WHERE id = '${id}'`;
        executeSqlQuery(sqlQuery, callback);
        console.log(sqlQuery);
        console.log('ce logro :0')}else{
          console.log('Token no válido');
        }
    }

//metodo para setear el celular
static setCelular(token,celular,callback){
    const result = verifyToken(token);
    if(!result.error){
    const id = result.decoded.id;
    const sqlQuery = `UPDATE Usuario SET celular = '${celular}' WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, callback);
    console.log(sqlQuery);
    console.log('ce logro :0')}else{
      console.log("Token no valido");
    }
}
//metodo para setear la foto
static setFoto(id,foto,callback){
    const result = verifyToken(token);
    if(!result.error){
    const id = result.decoded.id;
    const sqlQuery = `UPDATE Usuario SET foto = '${foto}' WHERE id = '${id}'`;
    executeSqlQuery(sqlQuery, callback);
    console.log(sqlQuery);
    console.log('ce logro :0')}else{
      console.log('Token no valido');
    }
}
//get de su celular
    static getCelular(token, callback) {
      const result = verifyToken(token);
      if(!result.error){
        const id = result.decoded.id;
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
        })}else{
          console.log('Token no valido');
        }
    }
    static getFoto(token,callback){
      const result =  verifyToken(token);
      if(!result.error){
        const id = result.decoded.id;
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
        })}else{
          console.log('Token no valido');
        }

    }

    
//get del tipo de documento del usuario
static getTipodeDoc(token, callback) {
    const result = verifyToken(token);
    if(!result.error){
    const id = result.decoded.id;
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
    });}else{
      console.log('Token no valido');
    }
}

//get del num de documento del usuario
static getnumDoc(token, callback){
    const result = verifyToken(token);
    if(!result.error){
    const id = result.decoded.id;
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
      });}else{
        console.log('Token no valido');
      }
}

//set del num de documento del usuario

static setnumDoc(token, numDoc, callback) {
  const result = verifyToken(token);

  if (result.error) {
      console.error('Error al verificar el token:', result.error.message);
      return callback(new Error('Token no válido'));
  }

  const id = result.decoded.id;
  const sqlQuery = `UPDATE Usuario SET numDoc = '${numDoc}' WHERE id = '${id}'`;

  executeSqlQuery(sqlQuery, (error, result) => {
      if (error) {
          console.error('Error al ejecutar la consulta SQL:', error.message);
          return callback(error);
      }

      if (result.affectedRows === 0) {
          console.log('Usuario no encontrado');
          return callback(new Error('Usuario no encontrado'));
      }

      console.log('Número de documento actualizado con éxito');
      callback(null, 'Número de documento actualizado con éxito');
  });
}


//get de la contraseña del usuario
static getContrasena(token, callback){
  const result = verifyToken(token);
  if(!result.error){
  const id = result.decoded.id;
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
    });}else{
      console.log('Token no valido');
    }
}


//set de lacontraseña del usuario



static setContrasena(token, contrasena, callback) {
  const result = verifyToken(token);

  if (result.error) {
      console.error('Error al verificar el token:', result.error.message);
      return callback(new Error('Token no válido'));
  }

  const id = result.decoded.id;
  const sqlQuery = `UPDATE Usuario SET contraseña = '${contrasena}' WHERE id = '${id}'`;

  executeSqlQuery(sqlQuery, (error, result) => {
      if (error) {
          console.error('Error al ejecutar la consulta SQL:', error.message);
          return callback(error);
      }

      if (result.affectedRows === 0) {
          console.log('Usuario no encontrado');
          return callback(new Error('Usuario no encontrado'));
      }

      console.log('Contraseña actualizada con éxito');
      callback(null, 'Contraseña actualizada con éxito');
  });
}


  }



  module.exports = UsuarioController;