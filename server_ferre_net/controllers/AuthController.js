const UserModel = require('../models/UserModel');


class AuthController{

    //--Función Base--//
    login(req, res){

        const {id, psw, rol} = req.body

        const userModel = new UserModel()
        userModel.setPassword = psw;
        userModel.setId = id;
        userModel.setRol = rol

        userModel.login()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Usuario Autenticado"
            })
        })
        .catch(err=>{
            console.error("Error al Autenticar el Usuario:", err);

            if(err === "Error en la contraseña, id o rol"){
                res.status(401).send({
                    'status':false,
                    'msg' : err
                })
                return
            }

            res.status(500).send({
                'status':false,
                'msg' : "Error al Autenticar el Usuario Intento más Tarde"
            })
        })
    }
     
}

module.exports =  AuthController;