var carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos'); //donde van a cargarse los elementos cuando aparezcan

const contenedorCarrito = document.getElementById('carrito-contenedor');
const comprarBtn = document.getElementById('comprar')

const precioTotal = document.getElementById('totalCompra');
const vaciar = document.getElementById('vaciarCarrito')

const buscador = document.getElementById('buscador')
const inputNombre = document.querySelector("#inputNombre")
const inputTel = document.querySelector("#inputTelefono")
const inputEmail = document.querySelector("#inputEmail")
const btnSubmit = document.querySelector("#submit")

const formulario = document.getElementById('formulario')



const URL = `../js/stock.json`;

let contenidoJSON = []
let stockProductos = []