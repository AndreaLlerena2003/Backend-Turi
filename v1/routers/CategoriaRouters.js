const express = require('express');
const CategoriaController = require('../../controllers/CategoriaController');
const Categoria = require('../../clases/Categoria');
const router = express.Router();

router
    .get('/getTodasCategorias', (req, res) => {
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
    })

module.exports = router;