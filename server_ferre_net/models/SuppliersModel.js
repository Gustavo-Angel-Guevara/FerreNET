const connection = require("./conexion");

class SuppliersModel{

    constructor(id, nombre, correo, telefono, direccion, sitioWeb){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.sitioWeb = sitioWeb;
    }

    getSuppliers(){
        //Logica y Sentencia SQL para relizar x operación sobre los datos
        return new Promise((resolve, reject) => {
            let SentenciaSQL = `SELECT *FROM suppliers`
            connection.query(`${SentenciaSQL}`, (err, rows) => {
                if (err || rows.length == 0) return reject(err)
                return resolve(rows)
            })
        })

    }

    //Más funciones aquí...

}


module.exports = SuppliersModel;