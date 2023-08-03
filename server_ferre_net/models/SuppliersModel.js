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

    /**
   * @param {any} id
   */
    set setId(id){
      this.idproveedor = id;
    }

    getSuppliers(){
        //Logica y Sentencia SQL para relizar x operación sobre los datos
        return new Promise((resolve, reject) => {
            let SentenciaSQL = `SELECT *FROM suppliers WHERE active = 1`
            connection.query(`${SentenciaSQL}`, (err, rows) => {
                if (err) return reject(err)
                return resolve(rows)
            })
        })

    }

    guardar() {
        const sentenciaSQL = `INSERT INTO suppliers (nombre, correo, telefono, direccion, sitio_web, active) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [this.nombre, this.correo, this.telefono, this.direccion, this.sitio_web, 1];
    
        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, values, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
        });
      }
    
    obtenerPorId() {
        const sentenciaSQL = `SELECT * FROM suppliers WHERE idproveedor = ?`;
        const values = [this.idproveedor];
    
        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, values, (err, rows) => {
            if (err) return reject(err);
            return resolve(rows);
          });
        });
    }
    
    
    
      actualizar() {
        const sentenciaSQL = `UPDATE suppliers SET nombre = ?, correo = ?, telefono = ?, direccion = ?, sitio_web = ? WHERE idproveedor = ?`;
        const values = [this.nombre, this.correo, this.telefono, this.direccion, this.sitio_web, this.idproveedor];
    
        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, values, (err, result) => {
            if (err || result.affectedRows === 0) return reject(err);
            return resolve(result);
          });
        });
      }
    
      eliminar() {
        const sentenciaSQL = `UPDATE suppliers SET active = 0 WHERE idproveedor = ?`;
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