const ProductoModel = require("../models/ProductoModel");
const connection = require("../models/conexion");


class ProductoController{
    actualizar(req, res){
        const Model = new InventarioModel()

        Model.actualizar()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : ""
            })
        })
        .catch(err=>{
            console.error("Error al...", err);
            res.status(500).send({
                'status':false,
                'msg' : "Error al [...] Intento más Tarde"
            })
        })
    }    
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
}   
    

module.exports =  ProductoController;

