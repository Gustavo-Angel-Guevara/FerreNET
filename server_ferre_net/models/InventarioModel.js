const connection = require("./conexion");

class InventarioModel{

    constructor(idproducto, cantidad){
        this.idproducto = idproducto;
        this.cantidad = cantidad;

        
    }

    actualizar(){
        //Logica y Sentencia SQL para relizar x operación sobre los datos
        return new Promise((resolve, reject) => {
            let SentenciaSQL = `update inventario set cantidad = ${this.cantidad} where idproducto = ${this.idproducto}`
            connection.query(`${SentenciaSQL}`, (err, rows) => {
                if (err || rows.length == 0) return reject(err)
                return resolve(rows)
            })
        })

    }

    



}


module.exports = InventarioModel;