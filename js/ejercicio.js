class Producto {
    constructor (nombre, color, importe) {
        this.nombre = nombre;
        this.color = color;
        this. precio = importe
    }
}
const productos =[];

function agregandoProductos() {
    productos.push(new Producto("borcegos", "negro", 15000))
    productos.push(new Producto("zapatillas", "negro", 15000))
    productos.push(new Producto("borcegos", "negro", 15000))
    productos.push(new Producto("borcegos", "negro", 18000))
    productos.push(new Producto("zapatillas", "negro", 15000))
    productos.push(new Producto("botas", "marron", 20000))
}
agregandoProductos()

function agregarNuevoProducto(nombre, color, precio){
    productos.push(new Producto(nombre, color, precio))
}
agregarNuevoProducto("zapatillas", "blancas", 12000);

console.table(productos);

// buscar todos los elementos que sean botas
function buscarElemento() {
    let busqueda = prompt("Ingrese producto a buscar ");
    let result = productos.filter(p => p.nombre === busqueda)
    console.log(result);
}
buscarElemento();