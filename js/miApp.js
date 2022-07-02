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

//filtro 
selecTalles.addEventListener('change',()=>{
    let arrayNuevo = stockProductos.filter(elemento => elemento.talle === selecTalles.value)
    selecTalles.value === 'all' ? mostrarProductos(stockProductos) : mostrarProductos(arrayNuevo)
})

document.addEventListener("DOMContentLoaded", ()=>{
    mostrarProductos(stockProductos)
})

//logica Ecommerce
function mostrarProductos(array){
    contenedorProductos.innerHTML = ""
    array.forEach(el => {
        let div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML= `<div class="card border-light">
                        <img src="${el.img}">
                        <div class="card-body">
                            <span class="card-title">${el.tipo} ${el.nombre} </span>
                        </div>
                        <div class="card-content">
                            <p>${el.desc}</p>
                            <p>Talle: ${el.talle}</p>
                            <p>$${el.precio}</p>
                            <button type="button"  class="btn btn-outline-secondary" id="boton${el.id}">Agregar al carrito<i class="fa-solid fa-cart-shopping"></i></button>
                        </div>
                    </div> `
        contenedorProductos.appendChild(div)
        let btnAgregar = document.getElementById(`boton${el.id}`)
        btnAgregar.addEventListener('click',()=>{
            mostrarCarrito(el.id);
        })
    })


}


function  actualizarCarrito (){
    contadorCarrito.innerText = carritoDeCompras.length
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.precio, 0 )   //acumulador     
}  

function mostrarCarrito(id) {
    let productoAgregar
    let btnEliminar
    let div
    evaluar(id) ? console.log("Ta bien") : (
    productoAgregar = stockProductos.find(obj=> obj.id === id),
    carritoDeCompras.push(productoAgregar),
    div = document.createElement('div'),
    div.setAttribute('class', 'productoEnCarrito'),
    div.innerHTML=`<p>${productoAgregar.nombre}</p>
                    <p id="${id}">1</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`,
    contenedorCarrito.appendChild(div),
    btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`),
    btnEliminar.addEventListener('click',()=>{
        const el = document.getElementById(id)
        el.innerText == 1 ? btnEliminar.parentNode.remove():
        el.innerText = parseInt(el.innerText) - 1

        
        carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id !== productoAgregar.id)
        actualizarCarrito()
    }),
    actualizarCarrito()
    )
}

const evaluar = (id) => {
    let el
    let valor
    carritoDeCompras.some(elemento => elemento.id === id) ? (
        valor = true,
        el = document.getElementById(id),
        el.innerText = parseInt(el.innerText) + 1
    ) : valor = false
    return valor
}
