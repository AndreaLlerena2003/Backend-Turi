// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {executeSqlQuery, executeSqlQueryGet } = require('./database/database'); // Importa las funciones de base de datos
const UsuarioController = require('./controllers/UsuarioController');
const Usuario = require('./clases/Usuario');
const Documento = require('./clases/Documento');
const DocumentoController = require('./controllers/DocumentoController');
const Categoria = require('./clases/Categoria');
const CategoriaController = require('./controllers/CategoriaController');
const CategoriaLugarController = require('./controllers/CategoriaLugarController');
const LugarRecomendado = require('./clases/LugarRecomendado');
const LugarRecomendadoController = require('./controllers/LugarRecomendadoController');
const Lugar= require('./clases/Lugar');
const LugarController = require('./controllers/LugarController');
const Reseña = require('./clases/Reseña');
const ReseñaController = require('./controllers/ReseñaController');
const Favorito = require('./clases/Favorito');
const FavoritoController = require('./controllers/FavoritoController');
const Viaje = require('./clases/Viaje');
const ViajeLugar = require('./clases/ViajeLugar');
const ViajeController = require('./controllers/ViajeController');
const ViajeLugarController = require('./controllers/ViajeLugarController');

const cors = require("cors");

// Configura el middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors());

// Puerto del servidor
const puerto = 3000;

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor en funcionamiento en el puerto ${puerto}`);
});


// Ruta para registrar un usuario
app.post('/usuarios/registro', (req, res) => {
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

  UsuarioController.registrarUsuario(nuevoUsuario, (err, rowCount) => {
    if (err) {
      console.error('Error al registrar usuario:', err.message);
      res.status(500).json('Error al registrar usuario.');
    } else {
      console.log('Usuario registrado con éxito.');
      res.status(200).json('Usuario registrado con éxito.');
    }
  });
});

// Ruta para editar un usuario



// Ruta para iniciar sesión de usuario
app.get('/usuarios/login', (req, res) => {
  const usuario = req.query.usuario;
  const contraseña = req.query.contraseña;

  UsuarioController.iniciarSesion(usuario, contraseña, (err, usuarioEncontrado) => {
    if (err) {
      console.error('Error al iniciar sesión:', err.message);
      res.status(500).send('Error al iniciar sesión.');
    } else {
      if (usuarioEncontrado) {
        console.log('Inicio de sesión exitoso.');
        const idUsuario = String(usuarioEncontrado.id);
        console.log('ID del usuario:', idUsuario);
        res.status(200).send(idUsuario);
      } else {
        console.log('Credenciales de inicio de sesión incorrectas.');
        res.status(401).send('Credenciales de inicio de sesión incorrectas.');
      }
    }
  });
});

// Ruta para obtener los datos del usuario según el ID
app.get('/usuarios/getDatosUsuario', (req, res) => {
  const id = req.query.id;
  UsuarioController.getDatosUsuario(id, (err, datosUsuario) => {
    if (err) {
      console.error('Error al encontrar usuario', err.message);
      res.status(500).json({ error: 'Error al buscar datos.' });
    } else {
      if (datosUsuario) {
        console.log('Se encontraron los datos del usuario');
        res.status(200).json(datosUsuario);
      } else {
        console.log('Usuario no encontrado');
        res.status(401).json({ error: 'Usuario no encontrado' });
      }
    }
  });
});


// Ruta para obtener el nombre del usuario segun id
app.get('/usuarios/getNombreUsuario', (req, res) => {
  const id = req.query.id;
  UsuarioController.getUsuario(id, (err, nombreUsuario) => {
    if (err) {
      console.error('Error al encontrar usuario', err.message);
      res.status(500).send('Error al inicio de sesión.');
    } else {
      if (nombreUsuario) {
        console.log('Se encontró el nombre de usuario');
        const nombreUsuarioString = String(nombreUsuario); 
        console.log('Nombre de Usuario:', nombreUsuarioString);
        res.status(200).send(nombreUsuarioString); // Corrección aquí
      } else {
        console.log('Usuario no encontrado');
        res.status(401).send('Nombre de usuario no encontrado');
      }
    }
  });
});
//endpoint para obtener nombre del usuario
app.get('/usuarios/getNombreVerdaderoUsuario', (req, res) => {
  const id = req.query.id;
  UsuarioController.getNombre(id, (err, nombreUsuario) => {
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
});


// Ruta para obtener el apellido del usuario segun id
app.get('/usuarios/getApellido', (req, res) => {
  const id = req.query.id;
  UsuarioController.getApellido(id, (err, apellidoUsuario) => {
    if (err) {
      console.error('Error al encontrar usuario', err.message);
      res.status(500).send('Error al inicio de sesión.');
    } else {
      if (apellidoUsuario) {
        console.log('Se encontró el apellido de usuario');
        const apellidoUsuarioString = String(apellidoUsuario); 
        console.log('Apellido de Usuario:', apellidoUsuarioString);
        res.status(200).send(apellidoUsuarioString); // Corrección aquí
      } else {
        console.log('Usuario no encontrado');
        res.status(401).send('Nombre de usuario no encontrado');
      }
    }
  });
});


// Ruta para obtener el correo segun id
app.get('/usuarios/getCorreo', (req, res) => {
  const id = req.query.id;
  UsuarioController.getCorreo(id, (err, correoUsuario) => {
    if (err) {
      console.error('Error al encontrar usuario', err.message);
      res.status(500).send('Error.');
    } else {
      if (correoUsuario) {
        console.log('Se encontró el correo de usuario');
        const correoUsuarioString = String(correoUsuario); 
        console.log('Correo de Usuario:', correoUsuarioString);
        res.status(200).send(correoUsuarioString);
      } else {
        console.log('Usuario no encontrado');
        res.status(401).send('usuario no encontrado');
      }
    }
  });
});

// Ruta para obtener el celular segun el id
app.get('/usuarios/getCelular',(req,res) => {
  const id = req.query.id;
  UsuarioController.getCelular(id,(err,celularUsuario)=> {
    if(err){
      console.error('Error al encontrar usuario',err.message);
      res.status(500).send('Error. ');
    }else{
      if(celularUsuario){
        console.log('se encontro el celular del usuario');
        const celularUsuarioString = String(celularUsuario);
        console.log('Celualr del Usuario: ', celularUsuarioString);
        res.status(200).send(celularUsuarioString);
      }else{
        console.log('Usuario no encontrado');
        res.status(401).send('usuario no encontrado')
      }
    }
  })
})

// Ruta para obtener la foto segun el id
app.get('/usuarios/getFoto',(req,res) => {
  const id = req.query.id;
  UsuarioController.getFoto(id,(err,fotoUsuario) => {
    if(err){
      console.error('error al encontrar usuario', err.message);
      res.status(500).send('Error. ');
    }else{
      if(fotoUsuario){
        console.log('se enocntro foto usuario');
        const fotoUsuarioString = String(fotoUsuario);
        console.log('Foto del usuario: ', fotoUsuarioString);
        res.status(200).send(fotoUsuarioString);
      }else{
        console.log('usuario no encontrado');
        res.status(401).send('usuario pipi');
      }
    }
  })
})

// ruta para traer el endpoint que te trae el tipo de documento segun el id del usuario
app.get('/usuarios/getTipoDoc', (req, res) => {
  const id = req.query.id;
  UsuarioController.getTipodeDoc(id, (err, tipoDocEncontrado) => {
    if (err) {
      console.error('Error al encontrar usuario con su doc', err.message);
      res.status(500).send('Error');
    } else {
      if (tipoDocEncontrado !== null) { // Verificamos si tipoDocEncontrado no es null
        console.log('Se encontró el tipo de documento correspondiente');
        const tipoDocEncontradoString = String(tipoDocEncontrado);
        console.log('Tipo de doc encontrado: ', tipoDocEncontradoString);
        res.status(200).send(tipoDocEncontradoString);
      } else {
        console.log('No se logró ejecutar bien el endpoint');
        res.status(401).send('No se encontró el tipo de documento'); // Modificamos el mensaje de respuesta
      }
    }
  });
});

//ruta que trae el endpoint para modificar el nombre del usuario --- usuario
app.post('/usuarios/postusuario', (req, res) => {
  id = req.body.id;
  nombreUsuario = req.body.usuario;
  UsuarioController.setUsuario(id,nombreUsuario,(err, rowCount) => {
    if (err) {
      console.error('Error al  cambiar nombre de usuario:', err.message);
      res.status(500).send('Error al cambiar nombre usuario.');
    } else {
      console.log('Cambio con éxito.');
      res.status(200).send('Cambio con éxito.');
    }
  });
});





//ruta que trae el endpoint para modificar el nombre oficial del usuario 
app.post('/usuarios/postNombreUsuario',(req,res)=>{
  id = req.body.id;
  nombreUsuarioOfical = req.body.nombre;
  UsuarioController.setNombreUsuario(id,nombreUsuarioOfical,(err,rowCount)=>{
    if(err){
      console.error('Error al cambiar nombre de usuario oficial: ', err.message);
      res.status(500).send('error al cambiar nombre de usuario');
    }else{
      console.log('cambio con exito');
      res.status(200).send('cambio con exito andrea god')
    }
  })
})


//ruta que trae el endpoint para modificar el apellido del usuario
app.post('/usuarios/postApellido',(req,res)=>{
  id = req.body.id;
  apellido = req.body.apellido;
  UsuarioController.setApellido(id,apellido,(err,rowCount)=>{
    if(err){
      console.error('Error al cambiar apellido de usuario: ', err.message);
      res.status(500).send('error al cambiar el apellido de usuario');
    }else{
      console.log('cambio con exito');
      res.status(200).send('cambio con exito andrea god')
    }
  })
})

//ruta que trae el endpoint para modificar el correo del usuario
app.post('/usuarios/postCorreo',(req,res)=>{
  id = req.body.id;
  correo = req.body.correo;
  UsuarioController.setCorreo(id,correo,(err,rowCount)=>{
    if(err){
      console.error('Error al cambiar el correo de usuario: ', err.message);
      res.status(500).send('error al cambiar el correo de usuario');
    }else{
      console.log('cambio con exito');
      res.status(200).send('cambio con exito andrea god')
    }
  })
})

//ruta que trae el endpoint para modificar el celular del usuario
app.post('/usuarios/postCelular',(req,res)=>{
  id = req.body.id;
  correo = req.body.celular;
  UsuarioController.setCorreo(id,correo,(err,rowCount)=>{
    if(err){
      console.error('Error al cambiar el celular de usuario: ', err.message);
      res.status(500).send('error al cambiar el celular de usuario');
    }else{
      console.log('cambio con exito');
      res.status(200).send('cambio con exito andrea god')
    }
  })
})

//ruta que trae el endpoint para modificar la foto del usuario
app.post('/usuarios/postFoto',(req,res)=>{
  id = req.body.id;
   foto = req.body.foto;
   UsuarioController.setFoto(id,foto,(err,rowCount)=>{
    if(err){
      console.error('Error al cambiar la foto del usuario: ', err.message);
      res.status(500).send('error al cambiar la foto del usuario');
    }else{
      console.log('cambio con exito');
      res.status(200).send('cambio con exito andrea god')
    }
  })
})

 //endpoints para clase DOCUMENTO
 app.get('/documento/getDocumento',(req,res) => {
  const id = req.query.id;
  DocumentoController.getDocumento(id,(err,nombreDocumento) => {
    if(err){
      console.error('error al encontrar el tipo de documento', err.message);
      res.status(500).send('Error. ');
    }else{
      if(nombreDocumento){
        console.log('se enocntro tipo de documento');
        const nombreDocumentoString = String(nombreDocumento);
        console.log('Nombre de Documento: ', nombreDocumentoString);
        res.status(200).send(nombreDocumentoString);
      }else{
        console.log('documento no encontrado');
        res.status(401).send('doc pipi');
      }
    }
  })
})


 //endpoint para  traer todos los tipos de documento
app.get('/documento/getTodosDocumentos', (req, res) => {
  DocumentoController.getTodosDocumentos((err, documentos) => {
    if (err) {
      console.error('Error al encontrar todos los tipos de documento:', err.message);
      res.status(500).json({ error: 'Error al obtener tipos de documento' });
    } else {
      if (documentos && documentos.length > 0) {
        console.log('Se encontraron tipos de documento:', documentos);
        res.status(200).json(documentos);
      } else {
        console.log('No se encontraron documentos');
        res.status(404).json({ message: 'No se encontraron documentos' });
      }
    }
  });
});


//endpoint de clase Categoria
app.get('/categoria/getTodasCategorias', (req, res) => {
  CategoriaController.getCategorias((err, categorias) => {
    if (err) {
      console.error('Error al encontrar todos los tipos de categoria:', err.message);
      res.status(500).json({ error: 'Error al obtener tipos de categoria' });
    } else {
      if (categorias && categorias.length > 0) {
        console.log('Se encontraron tipos de categoria:', categorias);
        res.status(200).json(categorias);
      } else {
        console.log('No se encontraron categorias');
        res.status(404).json({ message: 'No se encontraron categorias' });
      }
    }
  });
});



//endpoint para traer lugares segun un tipo de categorias
//endpoint de clase Categoria
app.get('/categoriaController/getLugaresByCategorias', (req, res) => {
  const categoria = req.query.categoria;
  CategoriaLugarController.traerLugaresSegunCategoria(categoria, (err, lugaresDeCategoria) => {
    if (err) {
      console.error('Error al encontrar todos los  LUGARES SEGUN  TIPO de categoria:', err.message);
      res.status(500).json({ error: 'Error al obtener lugares segun categoria' });
    } else {
      if (lugaresDeCategoria && lugaresDeCategoria.length > 0) {
        console.log('Se encontraron tipos los lugares:', lugaresDeCategoria);
        res.status(200).json(lugaresDeCategoria);
      } else {
        console.log('No se encontraron lugares segun cateogria');
        res.status(404).json({ message: 'No se encontraron lugares segun categoria' });
      }
    }
  });
});


//endpoint para traer lugares segun un tipo de categorias
//endpoint de clase Categoria
app.get('/categoriaController/getLugaresByCategoriasId', (req, res) => {
  const categoriaId = req.query.categoriaId;
  CategoriaLugarController.traerLugaresSegunCategoriaId(categoriaId, (err, lugaresDeCategoria) => {
    if (err) {
      console.error('Error al encontrar todos los  LUGARES SEGUN  TIPO de categoria id:', err.message);
      res.status(500).json({ error: 'Error al obtener lugares segun categoriaid' });
    } else {
      if (lugaresDeCategoria && lugaresDeCategoria.length > 0) {
        console.log('Se encontraron tipos los lugares:', lugaresDeCategoria);
        res.status(200).json(lugaresDeCategoria);
      } else {
        console.log('No se encontraron lugares segun cateogria');
        res.status(404).json({ message: 'No se encontraron lugares segun categoria' });
      }
    }
  });
});

//endpoints de lugar Recomendado 
//este endpoint traee todos los tipos de LugarRecomendado
app.get('/lugarRecomendado/getTodosLugarRecomendado', (req, res) => {
  LugarRecomendadoController.getLugarRecomendado((err, lugarRecomendados) => {
    if (err) {
      console.error('Error al encontrar todos los tipos de lugarrecomendado:', err.message);
      res.status(500).json({ error: 'Error al obtener tipos de lugares recomendados' });
    } else {
      if (lugarRecomendados && lugarRecomendados.length > 0) {
        console.log('Se encontraron tipos de lugares recomendados:', lugarRecomendados);
        res.status(200).json(lugarRecomendados);
      } else {
        console.log('No se encontraron lugares romendados');
        res.status(404).json({ message: 'No se encontraron lugares recomendados' });
      }
    }
  });
});

 //devolver id de lugar recomendado segun nombre de lugar recomendado
app.get('/lugarRecomendado/getLugarByNombreLugarRec', (req, res) => {
  const lugar = req.query.lugar;
  LugarRecomendadoController.getLugarRecomendadoByNombre(lugar,(err, lugarId) => {
    if (err) {
      console.error('Error al encontrar id de lugar rec:', err.message);
      res.status(500).json({ error: 'Error ' });
    } else {
      if (lugarId) {
        console.log('Se encontro lugar rec id:', lugarId);
        res.status(200).json(lugarId);
      } else {
        console.log('No se encontro');
        res.status(404).json({ message: 'No se encontro' });
      }
    }
  });
});



 //devolver lugar segun id de lugar recomendado
 app.get('/lugar/getLugarByIdLugarRec', (req, res) => {
  const id = req.query.id;
  LugarController.traerLugarSegunLugarRecomendadoId(id, (err, lugarC) => {
    if (err) {
      console.error('Error al encontrar lugar por ID de lugar recomendado:', err.message);
      res.status(500).json({ error: 'Error al obtener el lugar: ' + err.message });
    } else {
      if (lugarC && lugarC.length > 0) { 
        console.log('Se encontraron lugares según el ID de lugar recomendado:', lugarC);
        res.status(200).json(lugarC);
      } else {
        console.log('No se encontraron lugares para el ID de lugar recomendado proporcionado');
        res.status(404).json({ message: 'No se encontraron lugares para el ID de lugar recomendado proporcionado' });
      }
    }
  });
});
//traer los top 10 lugares
app.get('/lugar/getTopTen',(req,res) => {
  LugarController.traerTop10Lugares((err,lugarC)=>{
    if(err){
      console.error('Erro no econtramos top 10');
      res.status(500).json({errr: 'error al obtener top 10 ;v'+err.message});
    }else{
      if(lugarC && lugarC.length > 0){
        console.log('se encontraron lugares top 10: ',lugarC);
        res.status(200).json(lugarC);

      }else{
        console.log('no hay top 10');
        res.status(400).json({message: 'no hay ppipii'});

      }
    }
  })
})



 //devolver lugar segun id de lugar recomendado
 app.get('/lugar/getLugarById', (req, res) => {
  const id = req.query.id;
  LugarController.traerLugarSegunId(id, (err, lugarC) => {
    if (err) {
      console.error('Error al encontrar lugar por ID : ', err.message);
      res.status(500).json({ error: 'Error al obtener el lugar: ' + err.message });
    } else {
      if (lugarC) { 
        console.log('Se encontro según el ID :', lugarC);
        res.status(200).json(lugarC);
      } else {
        console.log('No se encontraro');
        res.status(404).json({ message: 'No se encontraron ' });
      }
    }
  });
});


//traer todos los lugares

app.get('/lugar/todos',(req,res) => {
  LugarController.traerTodosLosLugares((err,lugarC)=>{
    if(err){
      console.error('Error :v');
      res.status(500).json({errr: 'error ;vvvvvv'+err.message});
    }else{
      if(lugarC && lugarC.length > 0){
        console.log('se encontraron lugares : ',lugarC);
        res.status(200).json(lugarC);

      }else{
        console.log('no hay ;v ffff');
        res.status(400).json({message: 'no hay ppipii'});

      }
    }
  })
})

// Ruta para obtener las categorías de un lugar por su ID
app.get('/lugares/categorias', (req, res) => {
  const idLugar = req.query.idLugar;
  console.log('ID del lugar:', idLugar);

  CategoriaLugarController.getCategoriasPorLugar(idLugar, (err, categorias) => {
    if (err) {
      console.error('Error al obtener categorías del lugar:', err.message);
      res.status(500).send('Error al obtener categorías.');
    } else if (categorias.length === 0) {
      console.log('El lugar no tiene categorías asociadas.');
      res.status(404).send('El lugar no tiene categorías asociadas.');
    } else {
      // Mapear resultados para seleccionar solo la columna "categoria"
      const categoriasArray = categorias.map((row) => row.categoria);
      console.log('Categorías del lugar:', categoriasArray);
      res.status(200).json(categoriasArray);
    }
  });
});



//endpoint para crear reseña 
// Ruta para registrar un usuario
app.post('/resena/crearResena', (req, res) => {
  const reseña = new Reseña(
    req.body.fechaCreacion,
    req.body.comentario,
    req.body.puntaje
  );

  ReseñaController.registrarReseña(reseña, (err, rowCount) => {
    if (err) {
      console.error('Error al registrar reseña:', err.message);
      res.status(500).send('Error al registrar reseña.');
    } else {
      console.log('Reseña registrado con éxito.');
      res.status(200).send('Reseñan registrado con éxito.');
    }
  });
});

//endpoint para crear reseña 
// Ruta para registrar un usuario
app.post('/favorito/agregarFavorito', (req, res) => {
  const favorito = new Favorito(
    req.body.idUsuario,
    req.body.idLugar
  );

  FavoritoController.registrarFavorito(favorito, (err, rowCount) => {
    if (err) {
      console.error('Error al registrar favorito:', err.message);
      res.status(500).send('Error al registrar favorito.');
    } else {
      console.log('favorito registrado con éxito.');
      res.status(200).send('favorito registrado con éxito.');
    }
  });
});

//crear intinerario funciones
app.post('/viajes/registro', (req, res) => {
  const viaje = new Viaje(
    req.body.cantDias,
    req.body.idUsuario
  );

  ViajeController.registrarViaje(viaje, (result) => {
    if (result.error) {
      console.error('Error al registrar el viaje:', result.error.message);
      res.status(500).send('Error al registrar el viaje.');
    } else {
      console.log('Viaje registrado con éxito.');
      res.status(200).json({ message: 'Viaje registrado con éxito.', idViaje: result.lastInsertId });
    }
  });
});

//
app.post('/viaje/registrar', (req, res) => {
  const viaje = new Viaje(
    req.body.cantDias,
    req.body.idUsuario
  );

  ViajeController.registrarViaje(viaje, (err, nuevoIdViaje) => { // Elimina las llaves adicionales en la llamada a registrarViaje
    if (err) {
      console.error('Error al registrar el viaje:', err.message);
      res.status(500).json({ error: 'Error al registrar el viaje.' });
    } else {
      console.log('ce logro gentita:', nuevoIdViaje);
      res.status(200).json({ nuevoIdViaje });
    }
  });
});

//endpoint para creacion de viaje
app.post('/viajeLugar/registro', (req, res) => {
  const nuevoViajeLugar = new ViajeLugar(
    req.body.idViaje,
    req.body.idLugar,
    req.body.idTiempoDia,
    req.body.numDia
  );

  ViajeLugarController.registrarViajeLugar(nuevoViajeLugar , (result) => {
    if (result.error) {
      console.error('Error al agregar registros de ViajeLugar:', result.error.message);
      res.status(500).json({error: 'Error al agregar registros de ViajeLugar.'});
    } else {
      console.log('Registros de ViajeLugar agregados con éxito.');
      res.status(200).json({ message: 'Registros de ViajeLugar agregados con éxito.' });
    }
  });
});

//endpoint para el viajeLugar --> setear id
app.post('/viajeLugar/setIdLugar', (req, res) => {
  const { idLugar, idViaje, idTiempoDia, numDia } = req.body;

  ViajeLugarController.setIdLugar(idLugar, idViaje, idTiempoDia, numDia, (err) => {
    if (err) {
      console.error('Error al establecer el ID del lugar en ViajeLugar:', err.message);
      res.status(500).json({ error: 'Error al establecer el ID del lugar en ViajeLugar: ' + err.message });
    } else {
      console.log('ID del lugar establecido con éxito en ViajeLugar.');
      res.status(200).json({ message: 'ID del lugar establecido con éxito en ViajeLugar.' });
    }
  });
});

//traer contraseña de usuario
app.get('/usuarios/getContrasena', (req, res) => {
  const id = req.query.id;
  UsuarioController.getContrasena(id, (err, contraseñaUsuario) => {
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
});

//traer top 5 restaurantes
app.get('/lugares/top5restaurantes', (req, res) => {
  LugarController.traerTop5SegunRestaurante((err, lugares) => {
    if (err) {
      console.error('Error al obtener los lugares', err);
      res.status(500).json({ error: 'Error al obtener los lugares' });
    } else {
      res.status(200).json(lugares);
    }
  });
});

//traer top 5 actividad
app.get('/lugares/top5Actividad', (req, res) => {
  LugarController.traerTop5SegunActividad((err, lugares) => {
    if (err) {
      console.error('Error al obtener los lugares s', err);
      res.status(500).json({ error: 'Error al obtener los lugares ' });
    } else {
      res.status(200).json(lugares);
    }
  });
});

//traer top 5 lugar turistico
app.get('/lugares/top5LugarTuristico', (req, res) => {
  LugarController.traerTop5SegunLugarTuristico((err, lugares) => {
    if (err) {
      console.error('Error al obtener los lugares', err);
      res.status(500).json({ error: 'Error al obtener los lugares ' });
    } else {
      res.status(200).json(lugares);
      console.log("HOLA")
    }
  });
});

//cambiar contraseña
app.post('/usuarios/setContrasena', (req, res) => {
  const id = req.body.id; 
  const contrasena = req.body.contrasena;

  UsuarioController.setContrasena(id, contrasena, (err, resultado) => {
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
});

//endpoint para actualizar los datos del usuario
app.post('/usuarios/actualizarDatosUsuario', (req, res) => {
  
  const { id, nombre, usuario, apellido, correo, celular, foto } = req.body;

  UsuarioController.setDatosUsuario(id, nombre, usuario, apellido, correo, celular, foto, (err) => {
    if (err) {
      console.error('Error al actualizar los datos del usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar los datos del usuario.' });
    }

    console.log('Actualización de datos de usuario exitosa');
    res.status(200).json({ message: 'Datos de usuario actualizados con éxito' });
  });
});

//endpoint para traer todos los favoritos del usuario

app.get('/favoritos/TraerTodosFav', (req, res) => {
  const id = req.query.id; 

  FavoritoController.traerTodosFavorito(id, (err, lugaresFavoritos) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: ';vvvvvvvvvvvv' });
    }

    if (!lugaresFavoritos) {
      console.log('troste.');
      return res.status(404).json({ message: 'pipi.' });
    }

    res.status(200).json(lugaresFavoritos);
  });
});

// Ruta para verificar si un lugar es favorito para un usuario
app.get('/verificarFavorito', (req, res) => {
  const idUsuario = req.query.idUsuario; // Obtenemos el ID del usuario desde los parámetros de consulta
  const idLugar = req.query.idLugar; // Obtenemos el ID del lugar desde los parámetros de consulta

  FavoritoController.getFavorito(idUsuario, idLugar, (err, favorito) => {
    if (err) {
      console.error('Error al verificar si es favorito:', err.message);
      res.status(500).json({ resultado: 0, error: err.message });
    } else if (favorito) {
      console.log('El lugar es favorito para el usuario.');
      res.status(200).json({ resultado: 1 });
    } else {
      console.log('El lugar no es favorito para el usuario.');
      res.status(200).json({ resultado: 0 });
    }
  });
});

// Ruta para eliminar un favorito por ID de usuario e ID de lugar
app.delete('/favoritos/eliminar', (req, res) => {
  const idUsuario = req.query.idUsuario; // ID del usuario
  const idLugar = req.query.idLugar; // ID del lugar

  FavoritoController.eliminarFavorito(idUsuario, idLugar, (err, resultado) => {
    if (err) {
      console.error('Error al eliminar favorito', err.message);
      res.status(500).json({ error: 'Error al eliminar favorito' });
    } else {
      if (resultado.mensaje === 'No se encontró el favorito para eliminar') {
        res.status(404).json({ mensaje: 'No se encontró el favorito para eliminar' });
      } else {
        res.status(200).json({ mensaje: 'Favorito eliminado con éxito' });
      }
    }
  });
});
//endpoint para agregar un nuevo lugar
app.post('/lugares/crear', (req, res) => {
  try {
    const {
      descripcion,
      foto,
      puntaje,
      direccion,
      celular,
      linkWeb,
      horarioInicio,
      horaFin,
      nombre,
      costo,
      distrito,
      tipoLugar,
      categoria,
    } = req.body;

    const nuevoLugar = LugarFactory.crearLugar(tipoLugar);
    
    nuevoLugar.descripcion = descripcion;
    nuevoLugar.foto = foto;
    nuevoLugar.puntaje = puntaje;
    nuevoLugar.direccion = direccion;
    nuevoLugar.celular = celular;
    nuevoLugar.linkWeb = linkWeb;
    nuevoLugar.horarioInicio = horarioInicio;
    nuevoLugar.horaFin = horaFin;
    nuevoLugar.nombre = nombre;
    nuevoLugar.costo = costo;
    nuevoLugar.distrito = distrito;
    nuevoLugar.categoria = categoria;

    
    LugarFactory.registrarLugar(nuevoLugar, (err, rowCount) => {
      if (err) {
        console.error('Error ', err.message);
        res.status(500).send('Error al registrar el lugar .');
      } else {
        console.log('Lugar registrado con éxito.');
        res.status(201).json({ message: 'Lugar registrado con éxito' });
      }
    });
  } catch (error) {
    console.error('Error al crear', error);
    res.status(500).send(';v.');
  }
});