const LugarController = require('../controllers/LugarController');
const { executeSqlQueryGet } = require('../database/database');

// Mock de executeSqlQueryGet para reemplazar la implementación real
jest.mock('../database/database', () => {
  return {
    executeSqlQueryGet: jest.fn()
  };
});

describe('LugarController', () => {
  describe('traerLugaresPorFiltrado', () => {
    it('debería devolver lugares filtrados correctamente', (done) => {
      const idCategoriaPadre = 1;
      const idLugarRecomendado = 1;
      const idDistrito = 6;

      const expectedResult = {
        "lugares": [
          {
            "id": 1,
            "descripcion": "Restaurante de comida peruana",
            "foto": "https://i.pinimg.com/1200x/29/1c/b5/291cb59379301c2544dbb8816cf49ac1.jpg",
            "puntaje": 4,
            "direccion": "Av. Felipe Salaverry 2370, Jesús María",
            "celular": "(511) 461-6732",
            "linkweb": "https://tantaperu.com/",
            "horaInicio": 9,
            "horaFin": 23,
            "nombre": "Tanta",
            "costo": 45,
            "idDistrito": 6,
            "idTipoLugar": 1,
            "fotoBanner": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg",
            "lugar": "Restaurante",
            "distrito": "Jesus Maria"
          }
        ]
      };

      // Configurar el mock de executeSqlQueryGet para devolver el resultado simulado
      executeSqlQueryGet.mockImplementationOnce((sqlQuery, callback) => {
        callback(null, expectedResult.lugares);
      });

      LugarController.traerLugaresPorFiltrado(idCategoriaPadre, idLugarRecomendado, idDistrito, (err, response) => {
        if (err) {
          done(err);
        } else {
          expect(response).toHaveProperty('lugares');
          const lugares = response.lugares;
          expect(lugares).toEqual(expectedResult.lugares);
          done();
        }
      });
    });
  });

  // Nueva prueba unitaria para traerLugarSegunId
  describe('traerLugarSegunId', () => {
    it('debería devolver el lugar según el ID', (done) => {
      const idLugar = 1;

      const expectedResult = {
        "id": 1,
        "descripcion": "Restaurante de comida peruana",
        "foto": "https://i.pinimg.com/1200x/29/1c/b5/291cb59379301c2544dbb8816cf49ac1.jpg",
        "puntaje": 4,
        "direccion": "Av. Felipe Salaverry 2370, Jesús María",
        "celular": "(511) 461-6732",
        "linkweb": "https://tantaperu.com/",
        "horaInicio": 9,
        "horaFin": 23,
        "nombre": "Tanta",
        "costo": 45,
        "idDistrito": 6,
        "idTipoLugar": 1,
        "fotoBanner": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
      };

      // Configurar el mock de executeSqlQueryGet para devolver el resultado simulado
      executeSqlQueryGet.mockImplementationOnce((sqlQuery, callback) => {
        callback(null, [expectedResult]);
      });

      LugarController.traerLugarSegunId(idLugar, (err, result) => {
        if (err) {
          done(err);
        } else {
          expect(result).toEqual(expectedResult);
          done();
        }
      });
    });
  });

  // Nueva prueba unitaria para traerLugarSegunId cuando no se encuentra ningún lugar
  describe('traerLugarSegunId cuando no se encuentra ningún lugar', () => {
    it('debería devolver null', (done) => {
      const idLugar = 123;

      // Configurar el mock de executeSqlQueryGet para devolver un array vacío (ningún resultado)
      executeSqlQueryGet.mockImplementationOnce((sqlQuery, callback) => {
        callback(null, []);
      });

      LugarController.traerLugarSegunId(idLugar, (err, result) => {
        if (err) {
          done(err);
        } else {
          expect(result).toBeNull();
          done();
        }
      });
    });
  });

  // Nueva prueba unitaria para traerLugarSegunId cuando ocurre un error en la consulta
  describe('traerLugarSegunId con error en la consulta', () => {
    it('debería devolver un error', (done) => {
      const idLugar = 1;

      const expectedError = new Error('Error en la consulta SQL');

      // Configurar el mock de executeSqlQueryGet para devolver un error
      executeSqlQueryGet.mockImplementationOnce((sqlQuery, callback) => {
        callback(expectedError, null);
      });

      LugarController.traerLugarSegunId(idLugar, (err, result) => {
        expect(err).toEqual(expectedError);
        expect(result).toBeNull();
        done();
      });
    });
  });

  // Nueva prueba unitaria para traerLugarSegunId cuando el resultado es null
  describe('traerLugarSegunId cuando el resultado es null', () => {
    it('debería devolver null', (done) => {
      const idLugar = 1;

      // Configurar el mock de executeSqlQueryGet para devolver null
      executeSqlQueryGet.mockImplementationOnce((sqlQuery, callback) => {
        callback(null, null);
      });

      LugarController.traerLugarSegunId(idLugar, (err, result) => {
        if (err) {
          done(err);
        } else {
          expect(result).toBeNull();
          done();
        }
      });
    });
  });
});
