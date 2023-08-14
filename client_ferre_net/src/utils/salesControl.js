
let data = [
    {
        'codigo': 'PDW-003',
        'nombre' : 'Producto',
        'marca' : 'Marca',
        'precio_unitario' : '30',
        'cantidad':2
    },
    {
        'codigo': 'PDW-005',
        'nombre' : 'Producto 2',
        'marca' : 'Marca',
        'precio_unitario' : '15',
        'cantidad':1
    },
    {
        'codigo': 'PDW-007',
        'nombre' : 'Producto 3',
        'marca' : 'Marca',
        'precio_unitario' : '103',
        'cantidad':5
    },
    {
        'codigo': 'PDW-009',
        'nombre' : 'Producto 4',
        'marca' : 'Marca',
        'precio_unitario' : '73',
        'cantidad':3
    }
]

class SalesControl{
    constructor(){
        if(SalesControl.instace === undefined){
            this.product = null;
            this.productsID = {};
            this.quantiyProducts = 0;
            this.monto = 0;
            this.error = "";
            this.data = null
            SalesControl.instace = this;
            return this
        }

        return SalesControl.instace        
    }

    set setData(data){
        this.data = data
    }

    set setProduct(product){
        this.product = product;
    }

    get getQuantiyProducts(){
        return this.quantiyProducts
    }

    get getMonto(){
        return this.monto
    }

    get getError(){
        return this.error
    }

    searchProduct(productTerm, products, setProducts, cantidad){

        data = this.data

        let productFindIt = data.find(el=>el.codigo == productTerm);

        if(!productFindIt){
            this.error = "Este Producto No Existe";
            return false
        }

        let product = JSON.parse(JSON.stringify(productFindIt));

        if(cantidad === 0) cantidad = null;

        return this.updateProducts(product, cantidad, products, setProducts)
        
    }

    verifyExistedProduct(product){

        if(!this.productsID.hasOwnProperty(product['codigo']) || this.productsID[product['codigo']] === 0){
            return false;
        }

        return true;
    }

    updateProducts(product, cantidad, products, setProducts){
        if(!this.verifyExistedProduct(product) || this.productsID.length === 0){
            let productsID = this.productsID
            productsID[product['codigo']] = parseInt(cantidad) || 1

            if(product['cantidad'] <  (parseInt(cantidad) || 1)){
                this.error = "Producto Agotado"
                return false;
            }

            product['Cantidadtems'] = parseInt(cantidad) || 1
            this.quantiyProducts = this.quantiyProducts + parseInt(cantidad) || 1;

            product['precio_unitario'] = '$'+product['precio_unitario'];
            product['total'] = '$'+ product['precio_unitario'].replace('$', '') * product['Cantidadtems']
            this.monto = this.monto + product['precio_unitario'].replace('$', '') * (parseInt(cantidad) || 1);

            product['#'] = products.length
            this.productsID = productsID
            setProducts([...products, product])
        }else{
            let productsID = this.productsID
            productsID[product['codigo']] = productsID[product['codigo']] + 1


            let res = true;

            products.map((el, index) =>{
                if(el.codigo === product['codigo']){

                    if(products[index]['cantidad'] < products[index]['Cantidadtems'] + (parseInt(cantidad) || 1)){
                        this.error = "Producto Agotado"
                        res = false;
                        return true;
                    }
                    products[index]['Cantidadtems'] = products[index]['Cantidadtems'] + (parseInt(cantidad) || 1)

                    products[index]['total'] = '$'+ products[index]['precio_unitario'].replace('$', '') * products[index]['Cantidadtems']

                    this.monto = this.monto + products[index]['precio_unitario'].replace('$', '') * (parseInt(cantidad) || 1);

                    this.quantiyProducts = this.quantiyProducts + (parseInt(cantidad) || 1);

                    setProducts([...products])
                }

                return false;
            })

            if(res){
                return true
            }

            return false
            

        }

        return true;
        
    }

    removeProduct(idProduct, products, setProducts){
        console.log("Products of Sales Control:", idProduct)
        this.quantiyProducts = this.quantiyProducts - products[idProduct]['Cantidadtems']
        this.monto = this.monto - products[idProduct]['total'].replace('$', '')

        let productsID = this.productsID
        productsID[products[idProduct]['codigo']] = 0
        this.productsID = productsID
        products[idProduct]['precio_unitario'].replace('$', '')
        products.splice(idProduct)
        setProducts([...products])
        
    }


}

export {SalesControl as SalesControlClass};