const express = require('express');
const app = express()
const connection = require("./models/conexion");

// === IMPORTACIÓN DE RUTAS ===
// Aquí se importan las rutas de la carpeta ./routes 

const authRouter = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

// === FIN IMPORTACIÓN DE RUTAS ===


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// === RUTAS ===

// Aquí se definen las rutas del servidor

app.use(authRouter)
app.use(orderRoutes)
// Otras rutas...

// === FIN DE RUTAS ===


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error del servidor');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});