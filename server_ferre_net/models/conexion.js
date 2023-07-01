
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'ferrenet'
})

connection.connect((err) => {
  if (err) return console.log("Error al Conectarse a la BD verifique credenciales o servidor");
  console.log("Connected")
})


module.exports = connection;