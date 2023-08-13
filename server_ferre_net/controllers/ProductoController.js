const ProductoModel = require("../models/ProductoModel");
const connection = require("../models/conexion");


class ProductoController{
    
    obtenerProductoPorId(req, res) {
        const { idproducto } = req.params;

        const Model = new ProductoModel(idproducto);

        Model.obtenerPorId()
            .then(rows => {
                if (rows.length > 0) {
                    res.status(200).send({data:rows[0]});
                } else {
                    res.status(404).send({ error: "Producto no encontrado" });
                }
            })
            .catch(err => {
                console.error("Error al obtener el producto", err);
                res.status(500).send({ error: "Error al obtener el producto" });
            });
    }

    obtenerTodos(req, res) {
        const model = new ProductoModel();

        model.obtenerTodos()
            .then(rows => {
                res.status(200).send({data:rows});
            })
            .catch(err => {
                console.error("Error al obtener todos los productos", err);
                res.status(500).send({ error: "Error al obtener todos los productos" });
            });
    }

    guardar(req, res) {
        const {nombre, descripcion, marca, precio_unitario, precio_menudeo, precio_mayoreo, id_categoria, id_proveedor } = req.body;
        
        const producto = new ProductoModel(null, null, nombre, descripcion, marca, precio_unitario, precio_menudeo, precio_mayoreo, id_categoria, id_proveedor);
        console.log(id_proveedor)
        producto.generateCode()
          .then(result => {
            // Procesar el resultado
            res.send(result);
          })
          .catch(err => {
            console.log(err)
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
        const { id } = req.params;
        const model = new ProductoModel();
        model.idproducto = id;
        model.eliminar()
        .then(result => {
            res.send({ message: "Producto eliminado exitosamente" })
        })
        .catch(err => {
            console.error("Error al eliminar el producto", err);
            res.status(500).send({ error: "Error al eliminar el producto" });
         });
    }

}   
    

module.exports =  ProductoController;

