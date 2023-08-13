import config from "../utils/config";


class ApiUser{
    constructor(){
        this.settings = null;
        this.id = null;
        if(typeof ApiUser.instance == "object"){
            
            return ApiUser.instance
        }

        ApiUser.instance = this
        return this
    }

    set setSettings(settings){
        this.settings = settings
    }

    set setId(id){
        this.id = id
    }

    auth(){
        return fetch(`http://${config.serverIP}:${config.port}/login`, this.settings)
    }

    getUsers(){
        return fetch(`http://${config.serverIP}:${config.port}/user`)
    }

    getUserById(){
        return fetch(`http://${config.serverIP}:${config.port}/user/${this.id}`)
    }

    create(){
        return fetch(`http://${config.serverIP}:${config.port}/user`, this.settings)
    }

    update(){
        return fetch(`http://${config.serverIP}:${config.port}/user`, this.settings)
    }

    delete(){
        return fetch(`http://${config.serverIP}:${config.port}/user/${this.id}`, {method:'DELETE'})
    }


}


export default ApiUser;