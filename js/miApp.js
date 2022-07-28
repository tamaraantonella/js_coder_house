document.addEventListener('DOMContentLoaded', () =>mostrarproductos())

//Mostrar productos
function mostrarproductos() {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(producto => {
                //Renderizando card
                const div = document.createElement('div')
                div.classList.add('card')
                div.innerHTML = `        <div class="card">
                                            <img src="${producto.img}">
                                            <div class="card-body">
                                                <span class="card-title">${producto.tipo} ${producto.nombre} </span>
                                            </div>
                                            <div class="card-content" id="addCarrito">
                                                <p>${producto.desc}</p>
                                                <p>Talle: ${producto.talle}</p>
                                                <p>$${producto.precio}</p>
                                                <a id="agregar${producto.id}" class="btn-buy btn btn-primary">Agregar al carrito<i class="fa-solid fa-cart-shopping"></i></a>
                                            </div>
                                        </div>
                                    `
                contenedorProductos.appendChild(div);
                //Botón para agregar productos
                const boton = document.getElementById(`agregar${producto.id}`)
                boton.addEventListener('click', () => {
                    agregarAlCarrito(producto.id)
                    //ALERT
                    Swal.fire({
                        icon: 'success',
                        title: 'Agregaste al carrito',
                        text: (producto.nombre),
                        showConfirmButton: true,
                    })
                })
            })
        })
}

// carrito vacio
let carritoVacio = document.createElement('div')
carritoVacio.innerHTML = `
    <p class="alert alert-warning" role="alert">No hay nada en tu carrito</p> `
const avisoVacio = () => {
if(carritoDeCompras.length === 0) {
    contenedorCarrito.append(carritoVacio)
    comprarBtn.className = 'd-none'
    vaciar.className= 'd-none'
}}
avisoVacio()

//Agregar al carrito
const agregarAlCarrito = (prodId) => {
    const existe = carritoDeCompras.find(prod => prod.id === prodId)
    if (existe) {
        const prod = carritoDeCompras.map (prod =>{
            if (prod.id === prodId){
                prod.cantidad++
            }
            actualizarCarrito()
        })
    } else {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                const item = data.find((prod) => prod.id == prodId)
                carritoDeCompras.push(item)
                actualizarCarrito()
                guardarCarrito()
            })
    }
}

//Eliminar producto
function eliminarDelCarrito(prodID) {
    const item = carritoDeCompras.find((prod) => prod.id === prodID)
    const indice = carritoDeCompras.indexOf(item)
    if (carritoDeCompras[indice].cantidad === 1) {
        carritoDeCompras.splice(indice, 1)
        actualizarCarrito()
        Swal.fire({
            icon: 'info',
            title: 'Producto Eliminado!',
        })
    } else {
        carritoDeCompras[indice].cantidad -= 1
        actualizarCarrito()
        Swal.fire({
            icon: 'info',
            title: 'Producto Eliminado!',
        })
    }


}

//vaciar carrito
const vaciarCarrito = () => {
    carritoDeCompras = []
    actualizarCarrito()
}

vaciar.addEventListener('click', ()=> vaciarCarrito())

//Actualizar carrito
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carritoDeCompras.forEach((prod) => {
        let div = document.createElement('div')
        div.classList.add('productoEnCarrito', 'd-flex', 'w-100')
        div.id = `${prod.id}`
        div.innerHTML =
        `
        <p class="px-3"><span id= "cantidad">${prod.cantidad}</span></p>
        <p class="px-3">${prod.nombre}</p>
        <p>$${prod.precio*prod.cantidad}</p>
        <span onClick = (eliminarDelCarrito(${div.id})) class="px-3" role='button'><i class="fa-solid fa-trash"></i><span>
        `
        contenedorCarrito.appendChild(div)
    })
    let total= carritoDeCompras.reduce((acc, prod)=> acc + prod.precio*prod.cantidad, 0)
    precioTotal.innerText = `Total $${total}`
    comprarBtn.className = 'btn btn-primary'
    vaciar.className = 'btn btn-secondary'
    guardarCarrito()
    avisoVacio()

}

//Botones de filtro por talle
const talles = ['36', '38', '40', 'Todos']
var content = document.getElementById('talles')
content.innerHTML = ""
talles.forEach(talle => {
    var btn = document.createElement('button')
    btn.innerHTML = talle
    btn.id= talle
    btn.classList.add('btn', 'btn-primary', 'm-2')
    btn.addEventListener('click', () => {
        filtrarProd(btn.id)
    })
    content.appendChild(btn)
})

//filtrado
function filtrarProd(id){
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        contenedorProductos.innerHTML = ""
        if (id === 'Todos') {
            mostrarproductos()
        }
        const filtrarproductos = data.filter((prod) => prod.talle === id)

        filtrarproductos.forEach(producto => {
            //Renderizando card
            const div = document.createElement('div')
            div.classList.add('card')
            div.innerHTML = `        <div class="card">
                                        <img src="${producto.img}">
                                        <div class="card-body">
                                            <span class="card-title">${producto.tipo} ${producto.nombre} </span>
                                        </div>
                                        <div class="card-content" id="addCarrito">
                                            <p>${producto.desc}</p>
                                            <p>Talle: ${producto.talle}</p>
                                            <p>$${producto.precio}</p>
                                            <a id="agregar${producto.id}" class="btn-buy btn btn-primary">Agregar al carrito<i class="fa-solid fa-cart-shopping"></i></a>
                                        </div>
                                    </div>
                                `
            contenedorProductos.appendChild(div);
            //Botón para agregar productos
            const boton = document.getElementById(`agregar${producto.id}`)
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto.id)
                //ALERT
                Swal.fire({
                    icon: 'success',
                    title: 'Agregaste al carrito',
                    text: (producto.nombre),
                    showConfirmButton: true,
                })
            })
        })
    })
}
//guardo carrito
const guardarCarrito = () => {
    if (carritoDeCompras.length > 0) {
        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
    } else {
        localStorage.clear()
    }
}
//recuperando datos de carrito
function recuperoDatosCarrito() {
    if (miCarrito = JSON.parse(localStorage.getItem('carrito'))) {
        miCarrito.forEach(prod => {
            carritoDeCompras.push(prod)
        })
        actualizarCarrito()
    }
}
recuperoDatosCarrito()

//click en comprar, vacía el carrito
// comprarBtn.addEventListener('click', ()=> localStorage.clear())