const express = require('express');
const router = express.Router();
const storage = require('../../multer/regionalArtist')
const authenticateToken = require('../../controllers/middlaware/authMiddleware');
const someProtectedController = require('../../controllers/authController/someProtectedController');
const multer = require('multer')
const uploader = multer({storage})

const consulta = require('../../controllers/zurich/consulta');
const save = require('../../controllers/zurich/save');
const delet = require('../../controllers/zurich/delete');

router.route('/deleteVoto').delete( (request,response) => {
     let params = { ...request.body };
     delet.deleteVoto(params).then(result => {
     response.status(201).json(result);
     });
    });


 

router.route('/savevoto').post( (request,response) => {
     let params = { ...request.body };
     save.savevoto(params).then(result => {
     response.status(201).json(result);
     });
    });

    router.route('/getConteoVotos', authenticateToken).post( (request,response) => {
     let params = { ...request.body };

     consulta.getConteoVotos(params, request) // Asegúrate de pasar la solicitud para la autenticación
         .then(result => {
             response.status(200).json(result); // Usar 200 para solicitudes exitosas
         })
         .catch(error => {
             response.status(error.status || 500).json({ message: error.message }); // Manejo de errores
         });

    });

    


    module.exports = router;