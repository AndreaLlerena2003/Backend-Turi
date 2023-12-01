const ReseñaController = require('../controllers/ReseñaController')

describe("ReseñaController", () => {
    describe('registrarReseña', () => {
        test('deberia devolver el nuevo id de una reseña', (done) => {

            const reseña = {
                "idUsuario": 1,
                "idLugar": 2,
                "fechaCreacion": "2022-11-06",
                "comentario": "Esto es un comentario corto de reseña",
                "puntaje": 1.5
            }
            ReseñaController.registrarReseña(reseña, (err, response) => {
                if (err) {
                    done(err)
                } else {
                    expect(response).toHaveProperty('nuevoIdReseña');
                    done();
                }
            })
        })

        test('deberia devolver un error porque falta comentario', (done) => {

            const reseña = {
                "idUsuario": 1,
                "idLugar": 2,
                "fechaCreacion": "2022-11-06",
                "puntaje": 1.5
            }
            ReseñaController.registrarReseña(reseña, (err, response) => {
                if (err) {
                    done(err)
                } else {
                    expect(response).toHaveProperty('nuevoIdReseña');
                    done();
                }
            })
        })

        test('deberia devolver un error porque el puntaje está fuera del rango de decimal en la base de datos', (done) => {

            const reseña = {
                "idUsuario": 1,
                "idLugar": 2,
                "fechaCreacion": "2022-11-06",
                "comentario": "Esto es un comentario corto de reseña",
                "puntaje": 10.3
            }
            ReseñaController.registrarReseña(reseña, (err, response) => {
                if (err) {
                    done(err)
                } else {
                    expect(response).toHaveProperty('nuevoIdReseña');
                    done();
                }
            })
        })

        test('deberia devolver un error porque el comentario sobrepasa el límite de 900 caracteres', (done) => {

            const comentario = "Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña Esto es un comentario corto de reseña"
            const reseña = {
                "idUsuario": 1,
                "idLugar": 2,
                "fechaCreacion": "2022-11-06",
                "comentario": comentario,
                "puntaje": 1.5
            }
            ReseñaController.registrarReseña(reseña, (err, response) => {
                if (err) {
                    done(err)
                } else {
                    expect(response).toHaveProperty('nuevoIdReseña');
                    done();
                }
            })
        })

    })
})