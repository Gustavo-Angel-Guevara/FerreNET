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

    }

}


module.exports =  UserModel;