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

    

}

module.exports =  ProductoController;

