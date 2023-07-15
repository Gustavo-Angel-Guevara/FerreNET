const ProductoModel = require("../models/ProductoModel");
const connection = require("../models/conexion");


class ProductoController{
    
    obtenerProductoPorId(req, res) {
        const { idproducto } = req.params;

        const Model = new ProductoModel(idproducto);

        Model.obtenerPorId()
            .then(rows => {
                if (rows.length > 0) {
                    res.status(200).json(rows[0]);
                } else {
                    res.status(404).json({ error: "Producto no encontrado" });
                }
            })
            .catch(err => {
                console.error("Error al obtener el producto", err);
                res.status(500).json({ error: "Error al obtener el producto" });
            });
    }

    obtenerTodos(req, res) {
        const model = new ProductoModel();

        model.obtenerTodos()
            .then(rows => {
                res.status(200).json(rows);
            })
            .catch(err => {
                console.error("Error al obtener todos los productos", err);
                res.status(500).json({ error: "Error al obtener todos los productos" });
            });
    }
    guardar(req, res) {
        const { codigo, nombre, descripcion, marca, precio_unitario, precio_menudeo, precio_mayoreo, id_categoria, id_proveedor } = req.body;
        
        const producto = new ProductoModel(codigo, nombre, descripcion, marca, precio_unitario, precio_menudeo, precio_mayoreo, id_categoria, id_proveedor);
      
        producto.guardar()
          .then(result => {
            // Procesar el resultado
            res.send(result);
          })
          .catch(err => {
            // Manejar el error
            res.status(500).send(err);
          });
      }
      actualizar(req, res) {
        const {idproducto,codigo,nombre,descripcion,marca,precio_unitario,precio_menudeo,precio_mayoreo,id_categoria,id_proveedor} = req.body;
    
        const producto = new ProductoModel(idproducto,codigo,nombre,descripcion,marca,precio_unitario,precio_menudeo,precio_mayoreo,id_categoria,id_proveedor
        );
    
        producto
          .actualizar()
          .then(result => {
            // Procesar el resultado
            res.send(result);
          })
          .catch(err => {
            // Manejar el error
            res.status(500).send(err);
          });
      }

      eliminar(req, res) {
        const { idproducto } = req.params;
        const model = new ProductoModel();

        model.eliminar(idproducto)
        .then(result => {
         if (result.affectedRows > 0) {
            res.status(200).json({ message: "Producto eliminado exitosamente" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
        })
        .catch(err => {
        console.error("Error al eliminar el producto", err);
        res.status(500).json({ error: "Error al eliminar el producto" });
         });
        }

}   
    

module.exports =  ProductoController;

