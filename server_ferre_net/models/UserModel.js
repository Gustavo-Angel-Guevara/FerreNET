const connection = require("./conexion");
const jwt = require('jsonwebtoken');
require('dotenv').config();


class UserModel{

    #id;
    #password;
    #name;
    #rol;

    constructor(){
        this.#id = null;
        this.#password = null;
        this.#name = null;
        this.#rol = null;
        this.idUser = null;
        this.Empleado = null;
    }

    set setEmpleado(Empleado){
        this.Empleado = Empleado;
    }

    set setIdUser(idUser){
        this.idUser = idUser;
    }

    get getId() {
        return this.#id;
    }

    /**
     * @param {any} id
     */
    set setId(id) {
        this.#id = id;
    }

    get getPassword() {
        return this.#password;
    }

    /**
     * @param {any} password
     */
    set setPassword(password) {
        this.#password = password;
    }

    get getName() {
        return this.#name;
    }

    /**
     * @param {any} name
     */
    set setName(name) {
        this.#name = name;
    }

    get getRol() {
        return this.#rol;
    }

    /**
     * @param {any} rol
     */
    set setRol(rol) {
        this.#rol = rol;
    }


    login(){
        const sentenciaSQL = `SELECT *FROM users WHERE psw = '${this.#password}' AND id = '${this.#id}' AND id_rol = '${parseInt(this.#rol)}'`;

        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, (err, rows) => {
            if (err) return reject(err);
            if(rows.length == 0) return reject("Error en la contraseña, id o rol")
            
            const user = { id: rows[0]['idusuarios'], user: rows[0]['id'] };
            const secretKey = process.env.SECRET_KEY;

            const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

            return resolve({rows, token});
          });
        });
    }

    create(){
        const sentenciaSQL = `INSERT INTO empleado (nombre, telefono, correo, direccion) 
        VALUES ('${this.Empleado.name}', '${this.Empleado.number}', '${this.Empleado.email}', '${this.Empleado.address}')`;

        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, (err, rows) => {
            if (err) return reject(err);
            console.log("dwdwdwdwdwdwdwd")
            let idEmpleado = rows.insertId

            const sentenciaSQL = `INSERT INTO users (id, psw, id_rol, id_empleado, id_sucursal, active) 
            VALUES ('${this.#id}', '${this.#password}', '${this.#rol}', '${parseInt(idEmpleado)}', '${1}', '1')`;

            connection.query(sentenciaSQL, (err, rows) => {
                if (err) return reject(err);
                    
                return resolve(rows);
            });
            

          });
        });
    }

    update(){
        const sentenciaSQL = `SELECT *FROM users WHERE idusuarios = '${parseInt(this.idUser)}'`;
        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, (err, rows) => {
            if (err || rows.length == 0) return reject(err);
            let idEmpleado = rows[0]['id_empleado']

            const sentenciaSQL = `UPDATE empleado SET nombre= '${this.Empleado.name}', telefono = '${this.Empleado.number}', correo = '${this.Empleado.email}', direccion = '${this.Empleado.address}'
            WHERE idempleado = '${idEmpleado}' `;

            connection.query(sentenciaSQL, (err, rows) => {
                if (err) return reject(err);
                    
                const sentenciaSQL = `UPDATE users SET id_rol='${this.#rol}' WHERE idusuarios = '${parseInt(this.idUser)}'`;

                connection.query(sentenciaSQL, (err, rows) => {
                    if (err) return reject(err);
                        
                    return resolve(rows);
                });
            });
            

          });
        });
    }

    getUsers(){
        const sentenciaSQL = `SELECT users.idusuarios, users.id, users.psw, empleado.nombre, empleado.telefono, empleado.correo, empleado.direccion, rol.rol FROM users 
        INNER JOIN empleado ON users.id_empleado = empleado.idempleado
        INNER JOIN rol ON users.id_rol = rol.idrol WHERE users.active = '1'`;

        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, (err, rows) => {
            if (err) return reject(err);

            return resolve(rows);
          });
        });
    }

    getUserById(id){
        const sentenciaSQL = `SELECT users.idusuarios, users.id, users.psw, empleado.nombre, empleado.telefono, empleado.correo, empleado.direccion, rol.idrol FROM users 
        INNER JOIN empleado ON users.id_empleado = empleado.idempleado 
        INNER JOIN rol ON users.id_rol = rol.idrol
        WHERE users.idusuarios = ${id}`;

        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, (err, rows) => {
            if (err) return reject(err);

            return resolve(rows);
          });
        });
    }

    delete(){
        const sentenciaSQL = `UPDATE users SET active = '0' WHERE idusuarios = '${parseInt(this.idUser)}'`;
        return new Promise((resolve, reject) => {
          connection.query(sentenciaSQL, (err, rows) => {
            if (err || rows.length == 0) return reject(err);
            
            return resolve(rows)
          });
        });
    }

}


module.exports =  UserModel;