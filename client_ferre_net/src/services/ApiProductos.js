import config from "../utils/config";

class ApiProductos {
  constructor() {
    this.settings = null;
    this.productId = null;

    if (typeof ApiProductos.instance === "object") {
      return ApiProductos.instance;
    }

    ApiProductos.instance = this;
    return this;
  }

  set setSettings(settings) {
    this.settings = settings;
  }

  set setId(id){
    this.id = id;
}

  getProducts() {
    return fetch(`http://localhost:1000/productos`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  getInventory(){
    return fetch(`http://${config.serverIP}:${config.port}/inventario`);
  }

  createProduct() {
    return fetch(`http://${config.serverIP}:${config.port}/nuevoproducto`, this.settings);
  }

  updateProduct() {
    return fetch(`http://${config.serverIP}:${config.port}/actualizarproducto`, this.settings);
  }

  deleteProducto() {
    return fetch(`http://${config.serverIP}:${config.port}/productos/${this.id}`, { method: 'DELETE' });
  }

  getProductsById(){
    return fetch(`http://${config.serverIP}:${config.port}/productos/${this.id}`, {method: 'GET'})
  }

  searchProductByTerm(){
    return fetch(`http://${config.serverIP}:${config.port}/searchProducts/${this.id}`, {method: 'GET'})
  }

  updateInventory() {
    return fetch(`http://${config.serverIP}:${config.port}/actualizarinventario`, this.settings);
  }

}

export default ApiProductos;
