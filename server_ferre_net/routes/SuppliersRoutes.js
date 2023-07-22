const express = require('express');
const Controller = require('../controllers/SuppliersController'); //Cambiar Ruta al Controlador correspondiente
const SuppliersController = require('../controllers/SuppliersController');
const SuppliersRouter = express.Router();

//Importación del Controlador
const objController = new SuppliersController()

// === EndPoints ===

SuppliersRouter.get('/suppliers', objController.getSuppliers)
SuppliersRouter.put('/actualizarproveedor/:idproveedores', objController.actualizar);
SuppliersRouter.get('/proveedores/:idproveedores', objController.obtenerProveedorPorId);
SuppliersRouter.post('/nuevoproveedor', objController.guardar);
SuppliersRouter.delete('/proveedores/:idproveedores', objController.eliminar);


//Agregar más rutas....

// === Fin Endpoints ===

module.exports = SuppliersRouter;