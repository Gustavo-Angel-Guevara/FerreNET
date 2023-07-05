const express = require('express');
const Controller = require('../controllers/InventarioController'); //Cambiar Ruta al Controlador correspondiente
const inventarioruta = express.Router();

//Importación del Controlador
const objController = new Controller()

// === EndPoints ===

//nameRouter.post('/...', objController.fun1)
//nameRouter.get('/...', objController.fun2)
inventarioruta.put('/actualizarinventario', objController.actualizar)
//nameRouter.delete('/...', objController.fun2)

//Agregar más rutas....

// === Fin Endpoints ===

module.exports = inventarioruta;
