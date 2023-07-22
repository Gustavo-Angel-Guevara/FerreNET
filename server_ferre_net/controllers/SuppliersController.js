//Importar modelo(s)

const SuppliersModel = require("../models/SuppliersModel");

class SuppliersController{

    //--Función Base--//
    getSuppliers(req, res){
        const Model = new SuppliersModel()

        Model.getSuppliers()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "",
                'data':result
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

    //Más funciones aquí...

}


module.exports = SuppliersController;