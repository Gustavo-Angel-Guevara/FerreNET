const InventarioModel = require("../models/InventarioModel");

class InventarioController{

    //--Función Base--//
    actualizar(req, res){

        const {idproducto, cantidad} = req.body

        const Model = new InventarioModel(idproducto, cantidad)
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

    getInventario(req, res){
        const model = new InventarioModel();

        model.getAll()
            .then(rows => {
                res.status(200).send({data:rows});
            })
            .catch(err => {
                console.error("Error al obtener todos los productos", err);
                res.status(500).send({ error: "Error al obtener todos los productos" });
        });
    }

    //Más funciones aquí...

}


module.exports = InventarioController;