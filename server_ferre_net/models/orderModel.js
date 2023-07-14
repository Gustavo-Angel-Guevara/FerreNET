const connection = require("./conexion");

class OrderModel{

    static instancia;

    static getInstance() {
        if (!OrderModel.instancia) {
          OrderModel.instancia = new OrderModel();
        }
        return OrderModel.instancia;
    }

    constructor(id_order, fecha_creacion, status, producto, id_producto, cantidad, especificaciones, fecha_requerida, presupuesto_max, proveedor_pref){
        this.id_order = id_order;
        this.fecha_creacion = fecha_creacion;
        this.status = status;
        this.producto = producto;
        this.id_producto = id_producto;
        this.cantidad = cantidad;
        this.especificaciones = especificaciones;
        this.fecha_requerida = fecha_requerida;
        this.presupuesto_max = presupuesto_max;
        this.id_order = id_order;
        this.proveedor_pref = proveedor_pref;
    }

    get get_id_order() {
        return this.id_order;
    }
    /**
     * @param {any} value
     */
    set set_id_order(value) {
        this.id_order = value;
    }

    get get_fecha_creacion() {
        return this.fecha_creacion;
    }
    /**
     * @param {any} value
     */
    set set_fecha_creacion(value) {
        this.fecha_creacion = value;
    }

    get get_status() {
        return this.status;
    }
    /**
     * @param {any} value
     */
    set set_status(value) {
        this.status = value;
    }

    get get_producto() {
        return this.producto;
    }
    /**
     * @param {any} value
     */
    set set_producto(value) {
        this.producto = value;
    }

    get get_id_producto() {
        return this.id_producto;
    }
    /**
     * @param {any} value
     */
    set set_id_producto(value) {
        this.id_producto = value;
    }

    get get_cantidad() {
        return this.cantidad;
    }
    /**
     * @param {any} value
     */
    set set_cantidad(value) {
        this.cantidad = value;
    }

    get get_especificaciones() {
        return this.especificaciones;
    }
    /**
     * @param {any} value
     */
    set set_especificaciones(value) {
        this.especificaciones = value;
    }

    get get_fecha_requerida() {
        return this.fecha_requerida;
    }
    /**
     * @param {any} value
     */
    set set_fecha_requerida(value) {
        this.fecha_requerida = value;
    }

    get get_presupuesto_max() {
        return this.presupuesto_max;
    }
    /**
     * @param {any} value
     */
    set set_presupuesto_max(value) {
        this.presupuesto_max = value;
    }

    get get_proveedor_pref() {
        return this.proveedor_pref;
    }
    /**
     * @param {any} value
     */
    set set_proveedor_pref(value) {
        this.proveedor_pref = value;
    }
    
    //Almacenar Orden en Base de Datos
    saveOrder(newCode, resolve, reject){
        let SentenciaSQL = `INSERT INTO orden(id_orden, fecha_creacion, status, producto, id_producto, cantidad, especificaciones, fecha_requerida, presupuesto_max, proveedor_pref) 
        VALUES('${newCode}', '${this.fecha_creacion}', '${this.status}', '${this.producto}', ${this.id_producto ? parseInt(this.id_producto) : 'NULL'}, ${parseInt(this.cantidad)}, '${this.especificaciones}', '${this.fecha_requerida}', '${this.presupuesto_max}', '${this.proveedor_pref}')`
        connection.query(`${SentenciaSQL}`, (err, rows) => {
            if (err) return reject(err)
            return resolve(newCode)
        })    
    }
    
    //Genera un Codigo de Orden y llama función saveOrder() para alamacenar en BD
    generateOrder(){
        let code = 'OC-0000'
        return new Promise((resolve, reject) => {
            let SentenciaSQL = `SELECT * FROM orden ORDER BY idorden DESC LIMIT 1;
            `
            // Consulta la base de datos para obtener la última orden registrada
            connection.query(`${SentenciaSQL}`, (err, rows) => {                
                    
                if(rows.length != 0){
                    code = rows[0]['id_orden']
                }

                //Genera nuevo código de orden
                let formCode = code.split('-')[1]            
                let codeNumber = parseInt(formCode)
                let codeCeros = formCode.replace(`${codeNumber}`, '')                
                let newCode = `OC-${codeCeros}${codeNumber + 1}`

                // Llama a la función saveOrder() para almacenar la nueva orden
                this.saveOrder(newCode, resolve, reject)
            })
        })
        
    }

    getById(){
        return new Promise((resolve, reject)=>{
            let SentenciaSQL = `SELECT *FROM orden WHERE id_orden = '${this.id_order}'`
            connection.query(`${SentenciaSQL}`, (err, rows) => {
                if (err) return reject(err)
                return resolve(rows)
            })   
        }) 
    }

    cancel(){
        return new Promise((resolve, reject)=>{
            console.log(this.id_order   )
            let SentenciaSQL = `UPDATE orden SET status = 'Cancelado' WHERE id_orden = '${this.id_order}' and status = 'Enviado'`
            connection.query(`${SentenciaSQL}`, (err, rows) => {
                if (err) return reject(err)

                console.log(rows)

                return resolve(rows)
            })   
        }) 
    }

    getAll(){
        return new Promise((resolve, reject)=>{
            let SentenciaSQL = `SELECT *FROM orden`
            connection.query(`${SentenciaSQL}`, (err, rows) => {
                if (err) return reject(err)
                return resolve(rows)
            })   
        }) 
    }
    //Más funciones aquí...

}


module.exports = OrderModel;