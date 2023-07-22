import config from "../utils/config";


class ApiSuppliers{
    constructor(){
        this.settings = null;
        if(typeof ApiSuppliers.instance == "object"){
            return ApiSuppliers.instance
        }

        ApiSuppliers.instance = this
        return this
    }

    set setSettings(settings){
        this.settings = settings
    }

    getSuppliers(){
        return fetch(`http://${config.serverIP}:${config.port}/suppliers`)
    }


}


export default ApiSuppliers;