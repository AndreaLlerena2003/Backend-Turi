const { executeSqlQuery, executeSqlQueryGet } = require('../database/database');
//clase que maneja los Lugares asignados al viaje
class ViajeLugarController {
//se crea viaje vacio
    static crearRegistrosViajeLugar(idViaje, cantDias, callback) {
        const insertQueries = [];
        for (let numDia = 1; numDia <= cantDias; numDia++) {
            for (let idTiempoDia = 1; idTiempoDia <= 3; idTiempoDia++) {
                insertQueries.push(
                    `INSERT INTO ViajeLugar (idViaje, idLugar, idTiempoDia, numDia) VALUES (${idViaje}, NULL, ${idTiempoDia}, ${numDia})`
                );
            }
        }

        async function executeQueries() {
            for (const query of insertQueries) {
                await new Promise((resolve) => {
                    executeSqlQuery(query, (result) => {
                        if (result && result.error) {
                            callback(result);
                        } else {
                            resolve();
                        }
                    });
                });
            }
            callback({ message: 'Registros en ViajeLugar creados con éxito.' });
        }

        executeQueries();
    }
    //se setea id lugar
    static setIdLugar(idLugar,idViaje,idTiempoDia, numDia, callback){
        const sqlQuery = `UPDATE ViajeLugar SET idLugar = '${idLugar}' WHERE idViaje = '${idViaje}' 
        AND idTiempoDia = '${idTiempoDia}' AND numDia = '${numDia}'`;
        executeSqlQuery(sqlQuery, callback);
        console.log(sqlQuery);
        console.log('ce logro :0')
    }

    static registrarViajeLugar(viajeLugar, callback) {
        // Validar que idViaje sea válido
        const idViaje = viajeLugar.idViaje;
        const idTiempoDia = viajeLugar.idTiempoDia;
        const numDia = viajeLugar.numDia;

        // Validar que idViaje sea válido
        const validarIdViajeQuery = `SELECT id, cantDias FROM Viaje WHERE id = ${idViaje};`
        executeSqlQueryGet(validarIdViajeQuery, (err, resultadosViaje) => {
          if (err) {
            console.error('Error al validar el idViaje:', err.message);
            return callback({ error: err.message });
          } else if (resultadosViaje.length === 0) {
            return callback({ error: 'El idViaje no es válido.' });
          }

          // Validar que idTiempoDia sea un número entre 1 y 3
          if (idTiempoDia < 1 || idTiempoDia > 3) {
            return callback({ error: 'El idTiempoDia debe ser un número entre 1 y 3.' });
          }

          // Validar que numDia no sea mayor que cantDias
          const cantDiasViaje = resultadosViaje[0].cantDias;
          if (numDia > cantDiasViaje) {
            return callback({ error: 'El numDia no puede ser mayor que la cantidad de días del viaje.' });
          }

          // Insertar el registro de ViajeLugar
          const sqlQuery = `INSERT INTO ViajeLugar (idViaje, idLugar, idTiempoDia, numDia) VALUES (${idViaje}, ${viajeLugar.idLugar}, ${idTiempoDia}, ${numDia});`

          executeSqlQuery(sqlQuery, (err, result) => {
            if (err) {
              console.error('Error al registrar el ViajeLugar:', err.message);
              return callback({ error: err.message });
            }

            console.log('ViajeLugar registrado con éxito.');
            callback({ lastInsertId: result.lastInsertId });
          });
        });
      }
}

module.exports = ViajeLugarController;
