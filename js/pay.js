function guardarDatosDeUser() {
    const datosUser = {
        nombre: inputNombre.value,
        telefono: inputTel.value,
        email: inputEmail.value,
    };
    let str = JSON.stringify(datosUser) //me genera una cadena de texto
    localStorage.setItem("datosUser", str)

}

function recuperoDatosUser() {
    if (localStorage.getItem("datosUser")) {
        const datosUser = JSON.parse(localStorage.getItem("datosUser"))
        inputNombre.value = datosUser.nombre
        inputTel.value = datosUser.telefono
        inputEmail.value = datosUser.email
    }
}

//validar form
const enviarForm = () => {
    var error =[]
    if (inputNombre.value === null || inputNombre.value === "") error.push('Ingresa tu nombre')
    if (inputTel.value === null || inputTel.value === "" || inputTel.value.length < 9) error.push('Ingresa tu teléfono')
    if(inputEmail.value === null || inputEmail.value === "") error.push('Ingresa tu mail')
    let text = error.join(', ')
    if (error.length > 0) {
        Swal.fire({
            title: 'Faltan Datos',
            text: text,
            icon: 'error',
            confirmButtonText: 'OK'})
    }
    if (error.length === 0) alertForm('¿Finalizar compra?')
}

//submit del formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    guardarDatosDeUser(),
    enviarForm() ;
})

//alert del form
const alertForm = (mensaje) => {
    Swal.fire({
        title: mensaje,
        text: 'Hola '+ inputNombre.value.toUpperCase() + ' 😊 ' + 'te enviaremos los datos de tu compra a '+  inputEmail.value,
        icon: 'question',
        confirmButtonText: 'Finalizar compra',
        showCancelButton: true,
        cancelButtonText: "Volver"
    })
    .then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem('datosUser')
            localStorage.removeItem('carrito')
            Swal.fire({
                title: 'Gracias por tu compra!',
                text: 'Esperamos que vuelvas pronto 😊',
                icon: 'success',
                confirmButtonText: 'OK',
            })
            .then((result) => result ? window.location.href = "../index.html" : null)
    }
    })
}

recuperoDatosUser()