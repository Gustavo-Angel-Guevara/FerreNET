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

}


module.exports =  UserModel;