const express = require('express');
const Controller = require('../controllers/SuppliersController'); //Cambiar Ruta al Controlador correspondiente
const SuppliersController = require('../controllers/SuppliersController');
const SuppliersRouter = express.Router();

//Importación del Controlador
const objController = new SuppliersController()

// === EndPoints ===

//nameRouter.post('/...', objController.fun1)
SuppliersRouter.get('/suppliers', objController.getSuppliers)
//nameRouter.put('/...', objController.fun1)
//nameRouter.delete('/...', objController.fun2)

//Agregar más rutas....

// === Fin Endpoints ===

module.exports = SuppliersRouter;