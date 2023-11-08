const express = require('express');
const UsuarioController = require('../../controllers/UsuarioController');
const Usuario = require('../../clases/Usuario');
const router = express.Router();


router
    .get("/getDatosUsuario", (req, res) => {
        const token = req.query.token; // Extraer el token del cuerpo JSON

        UsuarioController.getDatosUsuario(token, (err, datosUsuario) => {
            if (err) {
                console.error('Error al encontrar usuario', err.message);
                res.status(500).json({ error: 'Error al buscar datos.' });
            } else {
                if (datosUsuario) {
                    console.log('Se encontraron los datos del usuario');
                    res.status(200).json(datosUsuario);
                } else {
                    console.log('Usuario no encontrado');
                    res.status(404).json({ error: 'Usuario no encontrado' });
                }
            }
        });
    })

    .post('/registro', (req, res) => {
      const nuevoUsuario = new Usuario(
        req.body.nombre,
        req.body.apellido,
        req.body.correo,
        req.body.contraseña,
        req.body.usuario,
        req.body.celular,
        req.body.foto,
        req.body.idTipDoc,
        req.body.numDoc,
      );
  
      UsuarioController.registrarUsuario(nuevoUsuario, (response) => {
        if (!response.success) {
          console.error('Error al registrar usuario:', response.message);
          res.status(500).json({ error: response.message, details: response.errorDetails });
        } else {
          console.log('Usuario registrado con éxito.');
          res.status(200).json({ success: true, message: 'Usuario registrado con éxito' });
        }
      });
  })
  
    .get('/login', (req, res) => {
        const usuario = req.query.usuario;
        const contraseña = req.query.contraseña;
      
        UsuarioController.iniciarSesion(usuario, contraseña, (err, usuarioEncontrado,token) => {
          if (err) {
            console.error('Error al iniciar sesión:', err.message);
            res.status(500).send('Error al iniciar sesión.');
          } else {
            if (usuarioEncontrado) {
              console.log('Inicio de sesión exitoso.');
              console.log(usuarioEncontrado);
              //const idUsuario = usuarioEncontrado.usuario.id;
              //console.log('ID del usuario:', idUsuario);
              const tokenJWT = token.token;
              console.log(tokenJWT)
              res.status(200).json({tokenJWT});
            } else {
              console.log('Credenciales de inicio de sesión incorrectas.');
              res.status(401).json('Credenciales de inicio de sesión incorrectas.');
            }
          }
        });
      })

      
    
    .get('/getNombreUsuario', (req, res) => {
        
        const token = req.query.token; 
        UsuarioController.getUsuario(token, (err, nombreUsuario) => {
          if (err) {
            console.error('Error al encontrar usuario', err.message);
            res.status(500).json('Error al inicio de sesión.');
          } else {
            if (nombreUsuario) {
              console.log('Se encontró el nombre de usuario');
              const nombreUsuarioString = String(nombreUsuario); 
              console.log('Nombre de Usuario:', nombreUsuarioString);
              res.status(200).json({nombreUsuario: nombreUsuarioString}); // Corrección aquí
            } else {
              console.log('Usuario no encontrado');
              res.status(401).json('Nombre de usuario no encontrado');
            }
          }
        });
      })
    
    .get('/getNombreVerdaderoUsuario', (req, res) => {
        const token = req.query.token;
        UsuarioController.getNombre(token, (err, nombreUsuario) => {
          if (err) {
            console.error('Error al encontrar usuario', err.message);
            res.status(500).json({ error: 'Error al inicio de sesión' });
          } else {
            if (nombreUsuario) {
              console.log('Se encontró el nombre de usuario');
              const nombreUsuarioString = String(nombreUsuario);
              console.log('Nombre de Usuario:', nombreUsuarioString);
              res.status(200).json({ nombre: nombreUsuarioString });
            } else {
              console.log('Usuario no encontrado');
              res.status(401).json({ error: 'Nombre de usuario no encontrado' });
            }
          }
        });
    })

    .get('/getApellido', (req, res) => {
        const token = req.query.token;
        UsuarioController.getApellido(token, (err, apellidoUsuario) => {
          if (err) {
            console.error('Error al encontrar usuario', err.message);
            res.status(500).json('Error al inicio de sesión.');
          } else {
            if (apellidoUsuario) {
              console.log('Se encontró el apellido de usuario');
              const apellidoUsuarioString = String(apellidoUsuario); 
              console.log('Apellido de Usuario:', apellidoUsuarioString);
              res.status(200).json({apellido: apellidoUsuarioString}); // Corrección aquí
            } else {
              console.log('Usuario no encontrado');
              res.status(401).json('Nombre de usuario no encontrado');
            }
          }
        });
      })
    
    .get('/getCorreo', (req, res) => {
        const token = req.query.token;
        UsuarioController.getCorreo(token, (err, correoUsuario) => {
          if (err) {
            console.error('Error al encontrar usuario', err.message);
            res.status(500).json('Error.');
          } else {
            if (correoUsuario) {
              console.log('Se encontró el correo de usuario');
              const correoUsuarioString = String(correoUsuario); 
              console.log('Correo de Usuario:', correoUsuarioString);
              res.status(200).json({correo: correoUsuarioString});
            } else {
              console.log('Usuario no encontrado');
              res.status(401).send('usuario no encontrado');
            }
          }
        });
      })
    
    .get('/getCelular',(req,res) => {
        const token = req.query.token;
        UsuarioController.getCelular(token,(err,celularUsuario)=> {
          if(err){
            console.error('Error al encontrar usuario',err.message);
            res.status(500).json('Error. ');
          }else{
            if(celularUsuario){
              console.log('se encontro el celular del usuario');
              const celularUsuarioString = String(celularUsuario);
              console.log('Celualr del Usuario: ', celularUsuarioString);
              res.status(200).json({celular: celularUsuarioString});
            }else{
              console.log('Usuario no encontrado');
              res.status(401).json('usuario no encontrado')
            }
          }
        })
      })
    
    .get('/getFoto',(req,res) => {
        const token = req.query.token;
        UsuarioController.getFoto(token,(err,fotoUsuario) => {
          if(err){
            console.error('error al encontrar usuario', err.message);
            res.status(500).json('Error. ');
          }else{
            if(fotoUsuario){
              console.log('se enocntro foto usuario');
              const fotoUsuarioString = String(fotoUsuario);
              console.log('Foto del usuario: ', fotoUsuarioString);
              res.status(200).json({foto: fotoUsuarioString});
            }else{
              console.log('usuario no encontrado');
              res.status(401).json('usuario pipi');
            }
          }
        })
      })
    
    .get('/getTipoDoc', (req, res) => {
        const token = req.query.token;
        UsuarioController.getTipodeDoc(token, (err, tipoDocEncontrado) => {
          if (err) {
            console.error('Error al encontrar usuario con su doc', err.message);
            res.status(500).json('Error');
          } else {
            if (tipoDocEncontrado !== null) { // Verificamos si tipoDocEncontrado no es null
              console.log('Se encontró el tipo de documento correspondiente');
              const tipoDocEncontradoString = String(tipoDocEncontrado);
              console.log('Tipo de doc encontrado: ', tipoDocEncontradoString);
              res.status(200).json({tipoDocumento: tipoDocEncontradoString});
            } else {
              console.log('No se logró ejecutar bien el endpoint');
              res.status(401).send('No se encontró el tipo de documento'); // Modificamos el mensaje de respuesta
            }
          }
        });
      })
    
    .post('/postusuario', (req, res) => {
        const token = req.body.token; 
        nombreUsuario = req.body.usuario;
        UsuarioController.setUsuario(token,nombreUsuario,(err, rowCount) => {
          if (err) {
            console.error('Error al  cambiar nombre de usuario:', err.message);
            res.status(500).send('Error al cambiar nombre usuario.');
          } else {
            console.log('Cambio con éxito.');
            res.status(200).send('Cambio con éxito.');
          }
        });
      })
    
   
    .post('/postNombreUsuario',(req,res)=>{
        token = req.body.token;
        nombreUsuarioOfical = req.body.nombre;
        UsuarioController.setNombreUsuario(token,nombreUsuarioOfical,(err,rowCount)=>{
          if(err){
            console.error('Error al cambiar nombre de usuario oficial: ', err.message);
            res.status(500).send('error al cambiar nombre de usuario');
          }else{
            console.log('cambio con exito');
            res.status(200).send('cambio con exito andrea god')
          }
        })
      })
    
    .post('/postApellido',(req,res)=>{
        token = req.body.token;
        apellido = req.body.apellido;
        UsuarioController.setApellido(token,apellido,(err,rowCount)=>{
          if(err){
            console.error('Error al cambiar apellido de usuario: ', err.message);
            res.status(500).send('error al cambiar el apellido de usuario');
          }else{
            console.log('cambio con exito');
            res.status(200).send('cambio con exito andrea god')
          }
        })
      })
    
    .post('/postCorreo',(req,res)=>{
        token = req.body.token;
        correo = req.body.correo;
        UsuarioController.setCorreo(token,correo,(err,rowCount)=>{
          if(err){
            console.error('Error al cambiar el correo de usuario: ', err.message);
            res.status(500).send('error al cambiar el correo de usuario');
          }else{
            console.log('cambio con exito');
            res.status(200).send('cambio con exito andrea god')
          }
        })
      })
    
    .post('/postCelular',(req,res)=>{
        token = req.body.token;
        correo = req.body.celular;
        UsuarioController.setCorreo(token,correo,(err,rowCount)=>{
          if(err){
            console.error('Error al cambiar el celular de usuario: ', err.message);
            res.status(500).send('error al cambiar el celular de usuario');
          }else{
            console.log('cambio con exito');
            res.status(200).send('cambio con exito andrea god')
          }
        })
      })

    .post('/postFoto',(req,res)=>{
        token = req.body.token;
         foto = req.body.foto;
         UsuarioController.setFoto(token,foto,(err,rowCount)=>{
          if(err){
            console.error('Error al cambiar la foto del usuario: ', err.message);
            res.status(500).send('error al cambiar la foto del usuario');
          }else{
            console.log('cambio con exito');
            res.status(200).send('cambio con exito andrea god')
          }
        })
      })

    .get('/getContrasena', (req, res) => {
        const token = req.query.id;
        UsuarioController.getContrasena(token, (err, contraseñaUsuario) => {
          if (err) {
            console.error('Error al encontrar contraseña', err.message);
            res.status(500).json({ error: 'Error al recuperar la contraseña' });
          } else {
            if (contraseñaUsuario) {
              console.log('Contraseña encontrada');
              res.status(200).json({ contraseña: contraseñaUsuario });
            } else {
              console.log('Usuario no encontrado o sin contraseña');
              res.status(401).json({ error: 'Contraseña no encontrada' });
            }
          }
        });
      })
    
    .post('/setContrasena', (req, res) => {
        const token = req.body.token; 
        const contrasena = req.body.contrasena;
      
        UsuarioController.setContrasena(token, contrasena, (err, resultado) => {
          if (err) {
            console.error('Error al actualizar contraseña', err.message);
            res.status(500).json({ error: 'Error al actualizar la contraseña' });
          } else {
            if (resultado === 'Contraseña actualizada con éxito') {
              console.log('Contraseña actualizada con éxito');
              res.status(200).json({ mensaje: resultado });
            } else if (resultado === 'Usuario no encontrado') {
              console.log('Usuario no encontrado');
              res.status(404).json({ error: 'Usuario no encontrado' });
            }
          }
        });
      })
    
    .post('/actualizarDatosUsuario', (req, res) => {
  
        const { token, nombre, usuario, apellido, correo, celular, foto } = req.body;      
        UsuarioController.setDatosUsuario(token, nombre, usuario, apellido, correo, celular, foto, (err) => {
          if (err) {
            console.error('Error al actualizar los datos del usuario:', err);
            return res.status(500).json({ error: 'Error al actualizar los datos del usuario.' });
          }
      
          console.log('Actualización de datos de usuario exitosa');
          res.status(200).json({ message: 'Datos de usuario actualizados con éxito' });
        });
    });

    
    
 
      

module.exports = router;  
      













