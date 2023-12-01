// Al principio del archivo de prueba
jest.mock('../database/database');

const UsuarioController = require('../controllers/UsuarioController');
const { executeSqlQueryGet, executeSqlQuery } = require('../database/database');

// Usuario de ejemplo
const usuarioMock = {
  nombre: 'Nombre',
  apellido: 'Apellido',
  correo: 'correo@gmail.com',
  contraseña: 'StrongPassword123',
  usuario: '',
  celular: '123456789',
  foto: '',
  idTipDoc: 1,
  numDoc: '123456789',
};

// Prueba de registro
test('Debería registrar un usuario correctamente', (done) => {
  // Configuración del caso de prueba
  executeSqlQueryGet.mockImplementationOnce((query, callback) => {
    // Simula que no hay usuarios con el mismo nombre de usuario
    callback(null, [{ count: 0 }]);
  });

  executeSqlQuery.mockImplementationOnce((query, callback) => {
    // Simula una inserción exitosa
    callback(null);
  });

  const callback = (response) => {
    // Verifica que la respuesta sea exitosa y que las funciones de base de datos se llamen correctamente
    expect(response.success).toBe(true);
    expect(response.message).toBe('Usuario registrado con éxito.');
    expect(executeSqlQueryGet).toHaveBeenCalled();
    expect(executeSqlQuery).toHaveBeenCalled();
    done();
  };

  UsuarioController.registrarUsuario(usuarioMock, callback);
});

// Prueba de nombre de usuario
test('Debería devolver un error si el nombre de usuario ya está en uso', (done) => {
  // Configuración del caso de prueba
  executeSqlQueryGet.mockImplementationOnce((query, callback) => {
    // Simula que ya hay usuarios con el mismo nombre de usuario
    callback(null, [{ count: 1 }]);
  });

  const callback = (response) => {
    // Verifica que la respuesta indique un error y que la función de base de datos se haya llamado
    expect(response.success).toBe(false);
    expect(response.message).toBe('El nombre de usuario ya está en uso.');
    expect(executeSqlQueryGet).toHaveBeenCalled();
    expect(executeSqlQuery).not.toHaveBeenCalled();
    done();
  };

  UsuarioController.registrarUsuario(usuarioMock, callback);
});

// Prueba de campos obligatorios a llenar
test('Debería devolver un error si faltan campos obligatorios', (done) => {
  const usuarioMockSinCamposObligatorios = {}; // Usuario sin campos obligatorios

  const callback = (response) => {
    expect(response.success).toBe(false);
    expect(response.message).toBe('Todos los campos son obligatorios.');
    expect(executeSqlQueryGet).not.toHaveBeenCalled();
    expect(executeSqlQuery).not.toHaveBeenCalled();
    done();
  };

  UsuarioController.registrarUsuario(usuarioMockSinCamposObligatorios, callback);
});

// Prueba de contraseña débil
test('Debería devolver un error si la contraseña es débil', (done) => {
  const usuarioMockConContraseñaDébil = {
    // ... Otros campos,
    contraseña: 'weakpassword',
  };

  const callback = (response) => {
    expect(response.success).toBe(false);
    expect(response.message).toBe(
      'La contraseña debe contener al menos una letra mayúscula y ser de al menos 7 caracteres.'
    );
    expect(executeSqlQueryGet).not.toHaveBeenCalled();
    expect(executeSqlQuery).not.toHaveBeenCalled();
    done();
  };

  UsuarioController.registrarUsuario(usuarioMockConContraseñaDébil, callback);
});
