// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController/authControllers');
const authenticateToken = require('../../controllers/middlaware/authMiddleware');
router.post('/login', authController.login);
router.post('/loginUsuario', authController.loginUsuario);
router.post('/loginUsuariovw', authController.loginUsuariovw);
router.post('/loginContrasenia', authenticateToken, authController.loginContrasenia);
router.post('/loginContraseniavw', authenticateToken, authController.loginContraseniavw);
router.post('/loginClave', authController.loginClave);
router.post('/protected', authController.authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
