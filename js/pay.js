function guardarDatosDeUser() {
    const datosUser = {
        nombre: inputNombre.value,
        telefono: inputTel.value,
        email: inputEmail.value,
    };
    let str = JSON.stringify(datosUser) //me genera una cadena de texto
    localStorage.setItem("datosUser", str)

}

document.addEventListener("submit", (e) => {
    e.preventDefault()
    guardarDatosDeUser()
    alertForm('Formulario enviado')
})

const alertForm = (mensaje) => {
    Swal.fire({
        title: mensaje,
        text: 'Gracias por su compra.',
        icon: 'success',
        confirmButtonText: 'OK'})
}

function recuperoDatosUser() {
    if (localStorage.getItem("datosUser")) {
        const datosUser = JSON.parse(localStorage.getItem("datosUser"))
        inputNombre.value = datosUser.nombre
        inputTel.value = datosUser.telefono
        inputEmail.value = datosUser.email
    }
}
recuperoDatosUser()