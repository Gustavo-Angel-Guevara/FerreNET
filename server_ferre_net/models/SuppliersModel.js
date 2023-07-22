const connection = require("./conexion");

class SuppliersModel{

    constructor(idproveedor, nombre, correo, telefono, direccion, sitio_web) {
        this.idproveedor = idproveedor;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.sitio_web = sitio_web;
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

    guardar() {
        const sentenciaSQL = `INSERT INTO proveedor (nombre, correo, telefono, direccion, sitio_web) VALUES (?, ?, ?, ?, ?)`;
        const values = [this.nombre, this.correo, this.telefono, this.direccion, this.sitio_web];
    
        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, values, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
        });
      }
    
      obtenerPorId() {
        const sentenciaSQL = `SELECT * FROM proveedor WHERE idproveedor = ?`;
        const values = [this.idproveedor];
    
        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, values, (err, rows) => {
            if (err) return reject(err);
            return resolve(rows);
          });
        });
      }
    
    
    
      actualizar() {
        const sentenciaSQL = `UPDATE proveedor SET nombre = ?, correo = ?, telefono = ?, direccion = ?, sitio_web = ? WHERE idproveedor = ?`;
        const values = [this.nombre, this.correo, this.telefono, this.direccion, this.sitio_web, this.idproveedor];
    
        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, values, (err, result) => {
            if (err || result.affectedRows === 0) return reject(err);
            return resolve(result);
          });
        });
      }
    
      eliminar() {
        const sentenciaSQL = `DELETE FROM proveedor WHERE idproveedor = ?`;
        const values = [this.idproveedor];
    
        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, values, (err, result) => {
            if (err || result.affectedRows === 0) return reject(err);
            return resolve(result);
          });
        });
      }
    //Más funciones aquí...

}


module.exports = SuppliersModel;