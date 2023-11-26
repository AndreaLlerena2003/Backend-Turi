const express = require('express');
const CategoriaPadreController = require('../../controllers/CategoriaPadreController');
const CategoriaPadre = require('../../clases/CategoriaPadre');
const router = express.Router();

router
    .get('/getTodasCategoriasPadres', (req, res) => {
        CategoriaPadreController.getCategorias((err, categorias) => {
        if (err) {
            console.error('Error al encontrar todos los tipos de categoria padre:', err.message);
            res.status(500).json({ error: 'Error al obtener tipos de categoria padres' });
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
    })

module.exports = router;