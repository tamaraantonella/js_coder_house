let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos'); //donde van a cargarse los elementos cuando aparezcan
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.querySelector('.precioProducto');

const selecTalles = document.getElementById('selecTalles')
const buscador = document.getElementById('search')

const inputNombre = document.querySelector("#inputNombre")
const inputTel = document.querySelector("#inputTelefono")
const inputEmail = document.querySelector("#inputEmail")
const btnSubmit = document.querySelector("#submit")

let datosDeInput = "";

const URL = `../js/stock.json`;
let cardsAmostrar = "";
let contenidoJSON = []
let stockProductos = []