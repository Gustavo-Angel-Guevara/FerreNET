const express = require('express');
const AuthController = require('../controllers/AuthController');
const authRouter = express.Router();

//Importación del Controlador
const objAuthController = new AuthController()

// === Rutas para autenticación de usuarios (login, logout...) ===
authRouter.post('/login', objAuthController.login)
authRouter.get('/cerrar-sesion', objAuthController.login)

//Agregar más rutas....

// === Fin Rutas para autenticación de usuarios (login, logout...) ===

module.exports = authRouter;