//Importar modelo(s)

const OrderModel = require("../models/orderModel");

class OrderController{

    newOrder(req, res){
        
        let {fecha_creacion, status, producto, id_producto, cantidad, especificaciones, fecha_requerida, presupuesto_max, proveedor_pref} = req.body
        
        const Model = new OrderModel(null, fecha_creacion, status, producto, id_producto, cantidad, especificaciones, fecha_requerida, presupuesto_max, proveedor_pref)

        Model.generateOrder()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Orden Generada",
                'idOrder':result
            })
        })
        .catch(err=>{
            console.error("Error al Generar la Orden", err);
            res.status(500).send({
                'status':false,
                'msg' : "Error al Generar la Orden Intento más Tarde"
            })
        })
    }    

    cancel(req, res){
        
        let {id} = req.params
        
        const Model = OrderModel.getInstance()

        Model.set_id_order = id

        Model.cancel()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Orden Cancelada"
            })
        })
        .catch(err=>{
            console.error("Error al Cancelar la Orden", err);
            res.status(500).send({
                'status':false,
                'msg' : "Error al Cancelar la Orden Intento más Tarde"
            })
        })
    }    

    getById(req, res){
        
        let {id} = req.params        
        const Model = OrderModel.getInstance();

        Model.set_id_order = id

        Model.getById()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Orden Obtenida",
                'data':result
            })
        })
        .catch(err=>{
            console.error("Error al Obtener la Orden", err);
            res.status(500).send({
                'status':false,
                'msg' : "Error al Obtener la Orden Intento más Tarde"
            })
        })
    }

    getAll(req, res){
        
        const Model = OrderModel.getInstance();

        Model.getAll()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Ordenes Obtenidas",
                'data':result
            })
        })
        .catch(err=>{
            console.error("Error al Obtener las Ordenes", err);
            res.status(500).send({
                'status':false,
                'msg' : "Error al Obtener las Ordenes Intento más Tarde"
            })
        })
    }

    
}


module.exports = OrderController;