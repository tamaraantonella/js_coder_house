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
recuperoDatosUser()

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
    if(error.length===0) alertForm('Formulario enviado')
}

const alertForm = (mensaje) => {
    Swal.fire({
        title: mensaje,
        text: 'Gracias por su compra.',
        icon: 'success',
        confirmButtonText: 'OK'})
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    guardarDatosDeUser(),
    enviarForm() ;
})

