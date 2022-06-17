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

// agregandoProductos();

console.table(productos);

// funcion para buscar algun elemento y retornar los que coincidan
function buscarElemento() {
    let busqueda = prompt("Ingrese producto a buscar ");
    let result = productos.filter(p => p.nombre === busqueda)
    return result
}

//Entrega 17 de junio. DESAFÍO COMPLEMENTARIO interactuando con el DOM

function saludar() {
    let nombreUsuario = prompt ('Hola! Por favor, ingresa tu nombre para tener una experiencia personalizada: ');
    while(nombreUsuario === ""){
        nombreUsuario = prompt ('Nombre no ingresado, ingresa tu nombre: ');
    }
    if (nombreUsuario != ""){
        saludo.innerText = "Todo listo para que empieces a comprar "+  nombreUsuario;
    }
}
saludar();

const cargarProductos = ()=> {
    listadoCalzados.innerHTML = ""
    for (calzado of productos) {
        const liProductos = document.createElement("li");
        liProductos.className = "item-calzado"
        liProductos.innerText = calzado
        liProductos.addEventListener("click", ()=> {
            agregarAlCarrito(`${liProductos.innerText}`)
        });
        listadoCalzados.append(liProductos)
    }
}


const agregarAlCarrito = (p)=> { 
    if (p > "") {
        const id = p + "enCarrito"
        const liCarrito = document.createElement("li")
            liCarrito.className = "collection-item-carrito"
            liCarrito.innerText = p
            liCarrito.id = id
            liCarrito.addEventListener("dblclick", ()=> {
                eliminarDelCarrito(`${id}`)
            })
            listadoCarrito.append(liCarrito)
    }
}

const eliminarDelCarrito = (productoID)=> { 
    if (confirm("¿Desea eliminar el producto?")) {
        const itemAeliminar = document.getElementById(productoID)
            itemAeliminar.remove()
            return
    }
}

cargarProductos();