const Empleado = require('../models/Empleado');
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
                'msg' : "Usuario Autenticado",
                'data':result.rows,
                'token':result.token
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

    create(req, res){
        const {nombre, telefono, correo, direccion, id, psw, rol} = req.body
        const userModel = new UserModel()
        const objEmpleado = new Empleado(nombre, telefono, correo, direccion);
        userModel.setId = id;
        userModel.setRol = rol
        userModel.setPassword = psw
        userModel.setEmpleado = objEmpleado;

        userModel.create()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Usuario Registrado",
                'data':result.rows,
            })
        })
        .catch(err=>{
            console.error("Error al Registrar el Usuario:", err);

            res.status(500).send({
                'status':false,
                'msg' : "Error al Registrar el Usuario Intento más Tarde"
            })
        })
    }

    update(req, res){
        const {nombre, telefono, correo, direccion, idusuarios, idrol} = req.body
        const userModel = new UserModel()
        const objEmpleado = new Empleado(nombre, telefono, correo, direccion);
        userModel.setIdUser = idusuarios;
        userModel.setRol = idrol
        userModel.setEmpleado = objEmpleado;

        userModel.update()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Usuario Registrado",
                'data':result.rows,
            })
        })
        .catch(err=>{
            console.error("Error al Registrar el Usuario:", err);

            res.status(500).send({
                'status':false,
                'msg' : "Error al Registrar el Usuario Intento más Tarde"
            })
        })
    }

    getUsers(req, res){
        const userModel = new UserModel()

        userModel.getUsers()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Usuario Registrado",
                'data':result,
            })
        })
        .catch(err=>{
            console.error("Error al seleccionar los Usuarios:", err);

            res.status(500).send({
                'status':false,
                'msg' : "Error al seleccionar los Usuarios Intento más Tarde"
            })
        })

    }

    getUserById(req, res){
        const {id} = req.params
        const userModel = new UserModel()

        userModel.getUserById(id)
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Usuario Registrado",
                'data':result,
            })
        })
        .catch(err=>{
            console.error("Error al seleccionar los Usuarios:", err);

            res.status(500).send({
                'status':false,
                'msg' : "Error al seleccionar los Usuarios Intento más Tarde"
            })
        })

    }

    delete(req, res){

        const {id} = req.params

        const userModel = new UserModel()
        userModel.setIdUser = id

        userModel.delete()
        .then(result =>{
            res.send({
                'status':true,
                'msg' : "Usuario dado de Baja",
            })
        })
        .catch(err=>{
            console.error("Error al dar de baja el Usuario:", err);

            res.status(500).send({
                'status':false,
                'msg' : "Error al dar de baja el Usuario Intento más Tarde"
            })
        })
    }

}

module.exports =  AuthController;