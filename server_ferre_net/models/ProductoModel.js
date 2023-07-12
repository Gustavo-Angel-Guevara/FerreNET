const connection = require("./conexion");

class ProductoModel {
    constructor(idproducto, codigo, nombre, descripcion, marca, precio_unitario, precio_menudeo, precio_mayoreo, id_categoria, id_proveedor) {
        this.idproducto = idproducto;
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.marca = marca;
        this.precio_unitario = precio_unitario;
        this.precio_menudeo = precio_menudeo;
        this.precio_mayoreo = precio_mayoreo;
        this.id_categoria = id_categoria;
        this.id_proveedor = id_proveedor;
    }

    guardar() {
        const sentenciaSQL = `INSERT INTO producto (codigo, nombre, descripcion, marca, precio_unitario, precio_menudeo, precio_mayoreo, id_categoria, id_proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [this.codigo, this.nombre, this.descripcion, this.marca, this.precio_unitario, this.precio_menudeo, this.precio_mayoreo, this.id_categoria, this.id_proveedor];

        return new Promise((resolve, reject) => {
            connection.query(sentenciaSQL, values, (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    }

    obtenerPorId() {
        const sentenciaSQL = `SELECT * FROM producto WHERE idproducto = ?`;
        const values = [this.idproducto];

        return new Promise((resolve, reject) => {
            connection.query(sentenciaSQL, values, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            });
        });
    }

    actualizar() {
        const sentenciaSQL = `UPDATE producto SET codigo = ?, nombre = ?, descripcion = ?, marca = ?, precio_unitario = ?, precio_menudeo = ?, precio_mayoreo = ?, id_categoria = ?, id_proveedor = ? WHERE idproducto = ?`;
        const values = [this.codigo, this.nombre, this.descripcion, this.marca, this.precio_unitario, this.precio_menudeo, this.precio_mayoreo, this.id_categoria, this.id_proveedor, this.idproducto];

        return new Promise((resolve, reject) => {
            connection.query(sentenciaSQL, values, (err, result) => {
                if (err || result.affectedRows === 0) return reject(err);
                return resolve(result);
            });
        });
    }

    eliminar() {
        const sentenciaSQL = `DELETE FROM producto WHERE idproducto = ?`;
        const values = [this.idproducto];

        return new Promise((resolve, reject) => {
            connection.query(sentenciaSQL, values, (err, result) => {
                if (err || result.affectedRows === 0) return reject(err);
                return resolve(result);
            });
        });
    }
}

module.exports = ProductoModel;


