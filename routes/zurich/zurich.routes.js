const express = require('express');
const router = express.Router();
const storage = require('../../multer/regionalArtist')
const authenticateToken = require('../../controllers/middlaware/authMiddleware');
const someProtectedController = require('../../controllers/authController/someProtectedController');
const multer = require('multer')
const uploader = multer({storage})

const save = require('../../controllers/zurich/save')

 

router.route('/savevoto').post( (request,response) => {
     let params = { ...request.body };
     save.savevoto(params).then(result => {
     response.status(201).json(result);
     });
    });

  


    module.exports = router;