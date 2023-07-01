const express = require('express');
const Controller = require('../controllers/OrderController'); //Cambiar Ruta al Controlador correspondiente
const OrderRouter = express.Router();

//Importación del Controlador
const objController = new Controller()

// === EndPoints ===

OrderRouter.post('/create-order', objController.newOrder)
//nameRouter.put('/...', objController.fun1)
OrderRouter.get('/order/:id', objController.getById)
OrderRouter.get('/orders', objController.getAll)
OrderRouter.patch('/cancel-order/:id', objController.cancel)

//Agregar más rutas....

// === Fin Endpoints ===

module.exports = OrderRouter;

