function guardarDatosDeUser() {
    const datosUser = {
        nombre: inputNombre.value,
        telefono: inputTel.value,
        email: inputEmail.value,
    };
    let str = JSON.stringify(datosUser) //me genera una cadena de texto
    localStorage.setItem("datosUser", str)

}



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



formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    guardarDatosDeUser(),
    enviarForm() ;
})

//validar form
const enviarForm = () => {
    var error =[]
    if (inputNombre.value === null || inputNombre.value === "") {
        error.push('Ingresa tu nombre')
    }
    if (inputTel.value === null || inputTel.value === "") {
        error.push('Ingresa tu telefono')
    }
    let text = error.join(', ')
    if (error.length > 0) {
        Swal.fire({
            title: 'Faltan Datos!',
            text: text,
            icon: 'error',
            confirmButtonText: 'OK'})
    }
    if(error.length===0) alertForm('Formulario enviado')
}
