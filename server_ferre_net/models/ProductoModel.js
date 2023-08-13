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

  guardar(newCode, resolve, reject) {
    const sentenciaSQL = `INSERT INTO producto (codigo, nombre, descripcion, marca, precio_unitario, precio_menudeo, precio_mayoreo, id_categoria, id_proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [newCode, this.nombre, this.descripcion, this.marca, this.precio_unitario, this.precio_menudeo, this.precio_mayoreo, this.id_categoria, this.id_proveedor];

    connection.query(sentenciaSQL, values, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  }


  generateCode(){
    let code = 'PR-0000'
    return new Promise((resolve, reject) => {
        let SentenciaSQL = `SELECT * FROM producto ORDER BY idproducto DESC LIMIT 1;
        `
        // Consulta la base de datos para obtener la última orden registrada
        connection.query(`${SentenciaSQL}`, (err, rows) => {                
                
            if(rows.length != 0){
                code = rows[0]['codigo']
            }

            //Genera nuevo código de orden
            let formCode = code.split('-')[1]            
            let codeNumber = parseInt(formCode)
            let codeCeros = formCode.replace(`${codeNumber}`, '')                
            let newCode = `PR-${codeCeros}${codeNumber + 1}`

            // Llama a la función saveOrder() para almacenar la nueva orden
            this.guardar(newCode, resolve, reject)
        })
    })
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

  obtenerTodos() {
    const sentenciaSQL = `SELECT *, producto.nombre AS nombre, proveedor.nombre AS proveedor FROM producto 
    INNER JOIN proveedor on producto.id_proveedor = proveedor.idproveedor
    JOIN categoria on producto.id_categoria = categoria.idcategoria`;

    return new Promise((resolve, reject) => {
      connection.query(sentenciaSQL, (err, rows) => {
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



