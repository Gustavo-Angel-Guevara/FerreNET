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

    obtenerProveedorPorId(req, res) {
        const { idproveedor } = req.params;
    
        const model = new ProveedorModel(idproveedor);
    
        model.obtenerPorId()
          .then(rows => {
            if (rows.length > 0) {
              res.status(200).json(rows[0]);
            } else {
              res.status(404).json({ error: "Proveedor no encontrado" });
            }
          })
          .catch(err => {
            console.error("Error al obtener el proveedor", err);
            res.status(500).json({ error: "Error al obtener el proveedor" });
          });
    }
    
    guardar(req, res) {
    const { nombre, correo, telefono, direccion, sitio_web } = req.body;

    const proveedor = new ProveedorModel(null, nombre, correo, telefono, direccion, sitio_web);

    proveedor.guardar()
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
        const { idproveedor, nombre, correo, telefono, direccion, sitio_web } = req.body;

        const proveedor = new ProveedorModel(idproveedor, nombre, correo, telefono, direccion, sitio_web);

        proveedor
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
        const { idproveedor } = req.params;
        const model = new ProveedorModel(idproveedor);

        model.eliminar()
        .then(result => {
            if (result.affectedRows > 0) {
            res.status(200).json({ message: "Proveedor eliminado exitosamente" });
            } else {
            res.status(404).json({ error: "Proveedor no encontrado" });
            }
        })
        .catch(err => {
            console.error("Error al eliminar el proveedor", err);
            res.status(500).json({ error: "Error al eliminar el proveedor" });
        });
    }

    //Más funciones aquí...

}


module.exports = SuppliersController;