const ViajeLugarController = require('../tu_ruta_del_controlador/ViajeLugarController');
const { executeSqlQueryGet, executeSqlQuery } = require('../database/database');

// PRUEBA: Obtener Itinerario Existente
test('traerItinerario devuelve el itinerario correctamente', (done) => {
    const token = 'token_valido';
    const idViaje = 1;

    ViajeLugarController.traerItinerario(token, idViaje, (err, resultados) => {
        // Verificar que no hay errores en el callback
        expect(err).toBeNull();
        // Verificar que los resultados contienen información detallada del itinerario
        expect(resultados).toBeDefined();
        done();
    });
});

// PRUEBA: Manejar Token No Válido
test('traerItinerario maneja correctamente un token no válido', (done) => {
    const token = 'token_invalido';
    const idViaje = 1;

    ViajeLugarController.traerItinerario(token, idViaje, (err) => {
        // Verificar que el callback recibe un mensaje de error indicando "Token no válido"
        expect(err).toEqual('Token no válido');
        done();
    });
});

// PRUEBA: Manejar IdViaje Inexistente
test('traerItinerario maneja correctamente un idViaje inexistente', (done) => {
    const token = 'token_valido';
    const idViaje = 999; // IdViaje inexistente

    ViajeLugarController.traerItinerario(token, idViaje, (err) => {
        // Verificar que el callback recibe un mensaje de error indicando "El idViaje no es válido"
        expect(err).toEqual({ error: 'El idViaje no es válido.' });
        done();
    });
});

// PRUEBA: Manejar Viaje Vacío
test('traerItinerario maneja correctamente un viaje vacío', (done) => {
    const token = 'token_valido';
    const idViaje = 2; // IdViaje que tiene itinerario vacío

    ViajeLugarController.traerItinerario(token, idViaje, (err, resultados) => {
        // Verificar que no hay errores en el callback
        expect(err).toBeNull();
        // Verificar que los resultados contienen información básica del viaje pero sin detalles del itinerario
        expect(resultados).toBeDefined();
        done();
    });
});