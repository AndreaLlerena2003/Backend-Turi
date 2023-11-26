const {
    executeSqlQueryGet,
    executeSqlQuery,
    executeSqlQueryWithGet,
  } = require('../database/database');
  
  jest.mock('tedious', () => {
    const mConnection = {
      on: jest.fn(),
      execSql: jest.fn(),
      connect: jest.fn(),
    };
    const mRequest = {
      on: jest.fn(),
      addParameter: jest.fn(),
      execute: jest.fn(),
    };
    return {
      Connection: jest.fn(() => mConnection),
      Request: jest.fn(() => mRequest),
    };
  });
  
  describe('Pruebas para funciones de ejecución de consultas SQL', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('executeSqlQueryGet', () => {
      it('debería ejecutar una consulta SQL y devolver resultados', (done) => {
        executeSqlQueryGet('SELECT * FROM Tabla', (err, result) => {
          expect(err).toBeNull();
          expect(result).toEqual([{ col1: 'valor1', col2: 'valor2' }]); 
          done();
        });
      });
  
    
    });
  
    describe('executeSqlQuery', () => {
      it('debería ejecutar una consulta SQL y devolver el número de filas afectadas', (done) => {
       
        executeSqlQuery('DELETE FROM Tabla', (err, rowCount) => {
          expect(err).toBeNull();
          expect(rowCount).toBe(5); 
          done();
        });
      });
  
      // Agrega más pruebas según sea necesario
    });
  
    describe('executeSqlQueryWithGet', () => {
      it('debería ejecutar una consulta SQL y devolver resultados', (done) => {
       
        executeSqlQueryWithGet('SELECT * FROM OtraTabla', (err, result) => {
          expect(err).toBeNull();
          expect(result).toEqual([{ col3: 'valor3', col4: 'valor4' }]); 
          done();
        });
      });
  
      // Agrega más pruebas según sea necesario
    });
  });
  