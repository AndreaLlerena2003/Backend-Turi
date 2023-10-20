const express = require('express');
const DocumentoController = require('../../controllers/DocumentoController');
const Documento = require('../../clases/Documento');
const router = express.Router();


router
    .get('/getDocumento',(req,res) => {
        const id = req.query.id;
        DocumentoController.getDocumento(id,(err,nombreDocumento) => {
        if(err){
            console.error('error al encontrar el tipo de documento', err.message);
            res.status(500).send('Error. ');
        }else{
            if(nombreDocumento){
            console.log('se enocntro tipo de documento');
            const nombreDocumentoString = String(nombreDocumento);
            console.log('Nombre de Documento: ', nombreDocumentoString);
            res.status(200).send(nombreDocumentoString);
            }else{
            console.log('documento no encontrado');
            res.status(401).send('doc pipi');
            }
        }
        })
    })
     //endpoint para  traer todos los tipos de documento
    .get('/getTodosDocumentos', (req, res) => {
        DocumentoController.getTodosDocumentos((err, documentos) => {
        if (err) {
            console.error('Error al encontrar todos los tipos de documento:', err.message);
            res.status(500).json({ error: 'Error al obtener tipos de documento' });
        } else {
            if (documentos && documentos.length > 0) {
            console.log('Se encontraron tipos de documento:', documentos);
            res.status(200).json(documentos);
            } else {
            console.log('No se encontraron documentos');
            res.status(404).json({ message: 'No se encontraron documentos' });
            }
        }
        });
    });

module.exports = router;  

  