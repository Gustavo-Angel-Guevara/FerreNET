const express = require('express');
const app = express()
const connection = require("./models/conexion");

// === IMPORTACIÓN DE RUTAS ===
// Aquí se importan las rutas de la carpeta ./routes 

const authRouter = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const inventarioruta = require('./routes/InvetarioRoutes');
const Productorouter = require('./routes/ProductoRoutes');
const SuppliersRouter = require('./routes/SuppliersRoutes');
// === FIN IMPORTACIÓN DE RUTAS ===

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  next();
})

// === RUTAS ===npm

// Aquí se definen las rutas del servidor

app.use(authRouter)
app.use(orderRoutes)
app.use(inventarioruta)
app.use(Productorouter)
app.use(SuppliersRouter)

// === FIN DE RUTAS ===


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error del servidor');
});

const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});