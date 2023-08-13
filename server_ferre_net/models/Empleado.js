const connection = require("./conexion");

class Empleado{
    constructor(name, number, email, address){
        this.name = name;
        this.number = number;
        this.email = email;
        this.address = address;
    }
}

module.exports = Empleado;