const express = require('express');
const Productorouter = express.Router();
const ProductoController = require('../controllers/ProductoController');

const productoController = new ProductoController();

// Define tus rutas y utiliza el productoController para manejar las solicitudes

Productorouter.put('/actualizarproducto', productoController.actualizar);
Productorouter.get('/productos/:idproducto', productoController.obtenerProductoPorId);
Productorouter.get('/productos', productoController.obtenerTodos);
Productorouter.post('/nuevoproducto', productoController.guardar);
Productorouter.delete('/productos/:id', productoController.eliminar);
Productorouter.get('/searchProducts/:term', productoController.search);

// Exporta el router
module.exports = Productorouter;


