import config from "../utils/config";


class ApiSuppliers{
    constructor(){
        this.settings = null;
        this.id = null
        if(typeof ApiSuppliers.instance == "object"){
            return ApiSuppliers.instance
        }

        ApiSuppliers.instance = this
        return this
    }

    /**
     * @param {any} settings
     */
    set setSettings(settings){
        this.settings = settings
    }

    /**
     * @param {any} id
     */
    set setId(id){
        this.id = id;
    }

    getSuppliers(){
        return fetch(`http://${config.serverIP}:${config.port}/suppliers`)
    }

    getSuppliersById(){
        return fetch(`http://${config.serverIP}:${config.port}/proveedores/${this.id}`, {method:"GET"})
    }

    updateSupplier(){
        return fetch(`http://${config.serverIP}:${config.port}/actualizarproveedor/${this.id}`, this.settings)
    }

    deleteSupplier(){
        return fetch(`http://${config.serverIP}:${config.port}/proveedores/${this.id}`, {method:'DELETE'})
    }

    createSupplier(){
        return fetch(`http://${config.serverIP}:${config.port}/nuevoproveedor`, this.settings)
    }

}


export default ApiSuppliers;