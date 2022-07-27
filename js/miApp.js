
document.addEventListener('DOMContentLoaded', () =>mostrarproductos())

//MOSTRAR PRODUCTOS
function mostrarproductos() {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(producto => {
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
                //Botones de filtro por talle
                const talles = ['36', '38', '40', 'Todos']
                var content = document.getElementById('talles')
                content.innerHTML = ""
                talles.forEach(talle => {
                    var btn = document.createElement('button')
                    btn.innerHTML = talle
                    btn.classList.add('btn', 'btn-primary', 'm-2')
                    btn.addEventListener('click', () => {
                        if (talle === 'Todos') {
                            contenedorProductos.innerHTML = "";
                            mostrarproductos()
                        } else {
                            let productoFiltrado = data.filter(e => e.talle === talle)
                            contenedorProductos.innerHTML = ""
                            productoFiltrado.forEach(producto => {
                                const cardHTML = `
                                    <div class="producto"
                                        <div class="card">
                                            <img src="${producto.img}">
                                            <div class="card-body">
                                                <span class="card-title">${producto.tipo} ${producto.nombre} </span>
                                            </div>
                                            <div class="card-content">
                                                <p>${producto.desc}</p>
                                                <p>Talle: ${producto.talle}</p>
                                                <p>$${producto.precio}</p>
                                                <a id="agregar${producto.id}" onclick=""class="btn btn-primary">Agregar al carrito<i class="fa-solid fa-cart-shopping"></i></a>
                                            </div>
                                        </div>
                                    </div>`
                                contenedorProductos.innerHTML += cardHTML;
                            })
                        }
                    })
                    content.appendChild(btn)
                })
            })
        })
    }


// AVISO: EL CARRITO ESTÁ VACÍO
let altercart = document.createElement('div')
altercart.innerHTML = `
    <p class="alert alert-warning" role="alert">EL CARRITO ESTÁ VACÍO</p> `
const avisoVacio = () => {
if(carritoDeCompras.length === 0) {
    contenedorCarrito.append(altercart)
    comprarBtn.className='d-none'
}}
avisoVacio()



//AGREGAR PRODUCTOS AL CARRITO, CANTIDAD++
const agregarAlCarrito = (prodId) => {
    const existe = carritoDeCompras.find(prod => prod.id === prodId)
    if (existe) {
        const prod = carritoDeCompras.map (prod =>{
            if (prod.id === prodId){
                prod.cantidad++
                prod.precio = prod.precio*prod.cantidad
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
            })
    }
}


//VACIAR CARRITO
// vaciarCarrito.onclick = () => {
//     precioTotal.innerText = ""
//     carritoDeCompras.length = 0
//     actualizarCarrito()
//     avisoVacio()

// }

//ELIMINAR PRODUCTO DEL CARRITO
function eliminarDelCarrito (prodID) {
    const confirmar = confirm('Desea eliminar el producto?')
    if (confirmar) {
        const itemAEliminar = document.getElementById(prodID)
        itemAEliminar.remove()
    }

}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carritoDeCompras.forEach((prod) => {
        let div = document.createElement('div')
        div.classList.add('productoEnCarrito', 'd-flex', 'justify-content-start')
        div.id = `${prod.id}Div`
        div.setAttribute('role', 'button')
        div.innerHTML =
        `
        <p class="px-3"><span id= "cantidad">${prod.cantidad}</span></p>
        <p class="px-3">${prod.nombre}</p>
        <p>$${prod.precio}</p>
        `
        div.ondblclick = () => {
            eliminarDelCarrito(div.id)
        }
        contenedorCarrito.appendChild(div)
    })
    let total= carritoDeCompras.reduce((acc,el)=> {
        let total = el.cantidad * el.precio
        return acc + total;
    }, 0)
    precioTotal.innerText = `Total $${total}`
    comprarBtn.className='btn btn-primary'

}


