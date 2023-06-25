const UserModel = require('../models/UserModel');


class AuthController{

    //--Función Base--//
    login(req, res){
        const userModel = new UserModel()

        userModel.login()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Usuario Autenticado"
            })
        })
        .catch(err=>{
            console.error("Error al Autenticar el Usuario:", err);
            res.status(500).send({
                'status':false,
                'msg' : "Error al Autenticar el Usuario Intento más Tarde"
            })
        })
    }
     
}

module.exports =  AuthController;