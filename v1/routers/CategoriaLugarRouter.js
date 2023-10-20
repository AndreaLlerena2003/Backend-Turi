const express = require('express');
const CategoriaLugarController = require('../../controllers/CategoriaLugarController');
const router = express.Router();


router
    //endpoint para traer lugares segun un tipo de categorias
    .get('/getLugaresByCategorias', (req, res) => {
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
    })

    //endpoint para traer lugares segun un tipo de categorias
    //endpoint de clase Categoria
    .get('/getLugaresByCategoriasId', (req, res) => {
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
    })

    // Ruta para obtener las categorías de un lugar por su ID
    .get('/categorias', (req, res) => {
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


module.exports = router;



    