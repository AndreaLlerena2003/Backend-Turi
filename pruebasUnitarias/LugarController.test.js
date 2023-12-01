const LugarController = require('../controllers/LugarController');
const { executeSqlQueryGet } = require('../database/database');

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
});
