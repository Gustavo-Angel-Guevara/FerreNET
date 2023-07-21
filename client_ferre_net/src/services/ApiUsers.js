import config from "../utils/config";


class ApiUser{
    constructor(){
        this.settings = null;
        if(typeof ApiUser.instance == "object"){
            return ApiUser.instance
        }

        ApiUser.instance = this
        return this
    }

    set setSettings(settings){
        this.settings = settings
    }

    auth(){
        return fetch(`http://${config.serverIP}:${config.port}/login`, this.settings)
    }


}


export default ApiUser;