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

// mostrarProductos(stockProductos)
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
        btnAgregar.addEventListener('click',()=>{
            agregarAlCarrito(el.id);
        })
    })
}



function mostrarCarrito(id) {
    let productoAgregar
    let btnEliminar
    let div
    evaluar(id) ? console.log("Ta bien") : (
    productoAgregar = stockProductos.find(obj=> obj.id == id),
    carritoDeCompras.push(productoAgregar),
    div = document.createElement('div'),
    div.setAttribute('class', 'productoEnCarrito'),
    div.innerHTML=`<p>${productoAgregar.nombre}</p>
                    <p id="Contador${id}">1</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`,
    contenedorCarrito.appendChild(div),
    btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`),
    btnEliminar.addEventListener('click',()=>{
        const el = document.getElementById(`Contador${id}`)
        el.innerText == 1 ? (
        btnEliminar.parentNode.remove(),
        carritoDeCompras = carritoDeCompras.filter((el)=> el.id != productoAgregar.id),
        actualizarCarrito()
        ):
        el.innerText = parseInt(el.innerText) - 1
        actualizarCarrito()
        console.log(carritoDeCompras)

    }),
    actualizarCarrito()
)}


function  actualizarCarrito (){
    cantidad = carritoDeCompras.reduce((acc, el)=>{
        let cantidad = parseInt(document.getElementById(`Contador${el.id}`).innerHTML)
        return acc + cantidad
    },0)
    contadorCarrito.innerText = cantidad
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> {
        let cantidad = document.getElementById(`Contador${el.id}`).innerHTML
        let total = cantidad * el.precio
        return acc + total
    }, 0 )   //acumulador
}

function agregarEventos(){
    const botones = document.querySelectorAll(`.botonAgregar`)
    const botonesArray = Array.apply(null, botones)
    botonesArray.forEach((ele)=>{
        ele.addEventListener("click", ()=>{
            mostrarCarrito(ele.parentElement.parentElement.id)
        })
    })
}

//FETCH
const obtContent = (URL) => {
    fetch(URL) //busca en la url del archivo JSON o servidor, en este caso archivoJSON
        .then(response => response.json()) // tambien puede ser asi,respuesta = JSON.parse(response)
        .then(data => {
            stockProductos = data;
            stockProductos.forEach(contenido => {
                cardsAmostrar += retornoCorrecto(contenido)
            })
            contenedorProductos.innerHTML = cardsAmostrar;
            agregarEventos()
        })
}

const retornoCorrecto = (content) => {
    const { nombre, tipo, img, talle, precio, id, desc } = content

    let HTMLCard = `<div id="${id}" class="card">
                    <img src="${img}">
                    <div class="card-body">
                        <span class="card-title">${tipo} ${nombre} </span>
                    </div>
                    <div class="card-content">
                        <p>${desc}</p>
                        <p>Talle: ${talle}</p>
                        <p>$${precio}</p>
                        <a class="btn btn-primary botonAgregar">Agregar al carrito<i class="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </div> `
    return HTMLCard

};

const evaluar = (id) => {
    let el
    let valor
    carritoDeCompras.some(elemento => elemento.id == id) ? (
        valor = true,
        el = document.getElementById(`Contador${id}`),
        el.innerText = parseInt(el.innerText) + 1,
        actualizarCarrito()
    ) : valor = false
    return valor
}

document.addEventListener("DOMContentLoaded", () => {
    obtContent(URL);
})