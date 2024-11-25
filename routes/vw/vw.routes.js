const express = require('express');
const router = express.Router();
const storage = require('../../multer/regionalArtist')
const authenticateToken = require('../../controllers/middlaware/authMiddleware');
const someProtectedController = require('../../controllers/authController/someProtectedController');
const multer = require('multer')
const uploader = multer({storage})


//const get_votos_campania = require('../../controllers/votoscampania/query');
const save = require('../../controllers/vw/save');
const query = require('../../controllers/vw/query');

router.get('/protected-data', authenticateToken, someProtectedController.getProtectedData);

router.route('/saveusuario').post( (request,response) => {
     let params = { ...request.body };
     save.saveusuario(params).then(result => {
     response.status(201).json(result);
     });
    });

    router.route('/getEmail').post( (request,response) => {
     let params = { ...request.body };
     query.getEmail(params).then(result => {
     response.status(201).json(result);
     });
    });


    module.exports = router;