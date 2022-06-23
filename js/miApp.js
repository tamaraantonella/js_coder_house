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
    console.log(selecTalles.value);
    if(selecTalles.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        let arrayNuevo = stockProductos.filter(elemento => elemento.talle === selecTalles.value)
        console.log(arrayNuevo);
        mostrarProductos(arrayNuevo)
    }
})

//Buscado

mostrarProductos(stockProductos)
//logica Ecommerce
function mostrarProductos(array){

    contenedorProductos.innerHTML = ""

    array.forEach(el => {
    let div = document.createElement('div')
    // div.className = 'producto'
    // div.setAttribute('class', 'producto')
    div.classList.add('producto')
    div.innerHTML= `<div class="card">
                    <img src="${el.img}">
                    <div class="card-body">
                        <span class="card-title">${el.tipo} ${el.nombre} </span>
                    </div>
                    <div class="card-content">
                        <p>${el.desc}</p>
                        <p>Talle: ${el.talle}</p>
                        <p>$${el.precio}</p>
                        <a id="boton${el.id}" class="btn btn-primary">Agregar al carrito<i class="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </div> `

    contenedorProductos.appendChild(div)
    
    let btnAgregar = document.getElementById(`boton${el.id}`)
    // console.log(btnAgregar);
    btnAgregar.addEventListener('click',()=>{
        agregarAlCarrito(el.id);
    })
  })


}

function agregarAlCarrito(id) {
    let productoAgregar = stockProductos.find(obj=> obj.id === id)
    carritoDeCompras.push(productoAgregar)
    mostrarCarrito(productoAgregar)
    actualizarCarrito()
}

function mostrarCarrito(productoAgregar) {

   let div = document.createElement('div')
    div.setAttribute('class', 'productoEnCarrito')
    div.innerHTML=`<p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    btnEliminar.addEventListener('click',()=>{
        btnEliminar.parentElement.remove()
        carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id !== productoAgregar.id)
        console.log(carritoDeCompras);
        actualizarCarrito()
    })
}


function  actualizarCarrito (){
    contadorCarrito.innerText = carritoDeCompras.length
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.precio, 0 )   //acumulador     
}                                                          



