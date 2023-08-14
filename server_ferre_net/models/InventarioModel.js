const connection = require("./conexion");

class InventarioModel{

    constructor(idproducto, cantidad){
        this.idproducto = idproducto;
        this.cantidad = cantidad;

        
    }

    actualizar(){
        //Logica y Sentencia SQL para relizar x operación sobre los datos
        return new Promise((resolve, reject) => {
            let SentenciaSQL = `update inventario set cantidad = ${this.cantidad} WHERE id_producto = ${this.idproducto}`
            connection.query(`${SentenciaSQL}`, (err, rows) => {
                if (err || rows.length == 0) return reject(err)
                return resolve(rows)
            })
        })

    }

    getAll(){
        return new Promise((resolve, reject) => {
            const sentenciaSQL = `SELECT *, producto.nombre AS nombre FROM inventario 
            INNER JOIN producto on inventario.id_producto = producto.idproducto`;
            connection.query(`${sentenciaSQL}`, (err, rows) => {
                
                if (err || rows.length == 0) return reject(err)
                return resolve(rows)
            })
        })
    }
}

module.exports = InventarioModel;