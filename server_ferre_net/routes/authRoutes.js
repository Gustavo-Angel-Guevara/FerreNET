const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthController = require('../controllers/AuthController');
const authRouter = express.Router();

//Importación del Controlador
const objAuthController = new AuthController()


// === Rutas para autenticación de usuarios (login, logout...) ===

authRouter.post('/validate-token', (req, res)=>{
    const token = req.body.token;
    const secretKey = process.env.SECRET_KEY;

    try {
        const decodedToken = jwt.verify(token, secretKey);
        // El token es válido, envía una respuesta de éxito
        res.status(200).json({ valid: true });
      } catch (error) {
        // El token no es válido, envía una respuesta de error
        res.status(401).json({ valid: false });
    }
})

authRouter.post('/login', objAuthController.login)
authRouter.get('/cerrar-sesion', objAuthController.login)
//authRouter.update('/user', objAuthController.update)
authRouter.post('/user', objAuthController.create)
authRouter.get('/user', objAuthController.getUsers)
authRouter.get('/user/:id', objAuthController.getUserById)
authRouter.put('/user', objAuthController.update)
authRouter.delete('/user/:id', objAuthController.delete)


//Agregar más rutas....

// === Fin Rutas para autenticación de usuarios (login, logout...) ===

module.exports = authRouter;

