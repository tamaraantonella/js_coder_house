const IVA = 1.21;
class Producto {
    constructor (nombre, color, importe) {
        this.nombre = nombre;
        this.color = color;
        this.precio = importe;
        this.precioSinIva = 0;
    }
    precioFinal() {
        this.precioSinIva = this.precio
        this.precio = parseFloat((this.precio * IVA))   
    }
}
const productos =[];

function agregandoProductos() {
    let inicio = window.confirm('Deseas agregar algún producto? ')
    while(inicio){
        let producto = prompt('que producto desea agregar?');
        let color = prompt('ingrese el color ');
        let precio = parseInt(prompt('ingrese precio '));
        let objetoAux = new Producto(producto, color, precio);
        productos.push(objetoAux.precioFinal());
        inicio = window.confirm('Deseas agregar algún producto? ');
    }
    return productos;
}

agregandoProductos();

console.table(productos);

// funcion para buscar algun elemento y retornar los que coincidan
function buscarElemento() {
    let busqueda = prompt("Ingrese producto a buscar ");
    let result = productos.filter(p => p.nombre === busqueda)
    return result
}
