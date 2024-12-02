const express = require('express');
const router = express.Router();
const  sendEmail  = require('../../controllers/correo/correo');

router.post('/sendEmail', sendEmail.sendEmail);
router.post('/sendEmailvw', sendEmail.sendEmailvw);

module.exports = router;
