function guardarDatosDeUser() {
    const datosUser = {
        nombre: inputNombre.value,
        telefono: inputTel.value,
        email: inputEmail.value,
    };
    let str = JSON.stringify(datosUser) //me genera una cadena de texto
    localStorage.setItem("datosUser", str)
    // let nombre = inputNombre.value;
    // let telefono = inputTel.value;
    // let email = inputEmail.value;
    //     localStorage.setItem("nombre", nombre);
    //     localStorage.setItem("telefono", telefono)
    //     localStorage.setItem("email", email)
}

document.addEventListener("submit", (e) => {
    e.preventDefault()
    guardarDatosDeUser()
    alert("Formulario enviado")
})

function recuperoDatosUser() {
    if(localStorage.getItem("datosUser")) {
        const datosUser = JSON.parse(localStorage.getItem("datosUser"))
        inputNombre.value = datosUser.nombre
        inputTel.value = datosUser.telefono
        inputEmail.value = datosUser.email
    } else{
        //btnSubmite.disabled = true;
    }
}
recuperoDatosUser()