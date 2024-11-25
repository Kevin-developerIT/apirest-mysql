const express = require('express');
const router = express.Router();

const saveclave = require("../../controllers/claveswebs/claves");


router.route('/saveclave').post( (request,response) => {
    let params = { ...request.body };
    saveclave.saveclave(params).then(result => {
    response.status(201).json(result);
    });
   });

module.exports = router;