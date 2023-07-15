import config from "../utils/config";

class ApiOrdenes{

    constructor(){

        this.settings = null;
        this.id = null

        if(typeof ApiOrdenes.instance == "object"){
            return ApiOrdenes.instance
        }

        ApiOrdenes.instance = this
        return this
    }

    set setSettings(settings){
        this.settings = settings
    }

    set setId(id){
        this.id = id;
    }

    getOCs(){
        return fetch(`http://${config.serverIP}:${config.port}/orders`)
    }


    createOC(){
        return fetch(`http://${config.serverIP}:${config.port}/create-order`, this.settings)
    }

    updateOC(){

    }

    deleteOC(){
        return fetch(`http://${config.serverIP}:${config.port}/cancel-order/${this.id}`, {method:'PATCH'})
    }

}

export default ApiOrdenes;