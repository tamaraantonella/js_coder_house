class ImprimirDatos {
    constructor(fullName, edad, domicilio) {
        this.fullName = fullName;
        this.edad = edad;
        this.domicilio = domicilio;
    }
}
function datosImpresos() {
        let fullName = prompt('Ingrese nombre completo: ');
        let edad = parseInt(prompt('Ingrese edad: '));
        let domicilio = prompt('ingrese domicilio: ');
        let persona = new ImprimirDatos(fullName, edad, domicilio);
        const personaDatos = document.createElement("div");
        personaDatos.innerHTML= `<p>${persona.fullName} de ${persona.edad} años con domicilio en ${persona.domicilio} completa el siguiente formulario para abonar: </p>`
        personaDatos.className="datos-impresos"
        datosPersona.append(personaDatos);
}

const focoEnCampos = ()=> {
    const campos = document.querySelectorAll("input")
    for (let campo of campos) {
        if (campo.type != "submit") {
            campo.addEventListener("focus", ()=> campo.className = "fondo-inputs")
            campo.addEventListener("blur", ()=> campo.className = "")
        }
    }
}

btnSubmit.addEventListener("mousemove", ()=> {
    btnSubmit.title = "Complete los datos antes de ENVIAR"
})

document.addEventListener("submit", (event)=> {
    event.preventDefault()
})


inputNombre.addEventListener("keyup", (event)=> {
    datosDeInput = event.target.value
    console.log(datosDeInput)
})

inputNombre.addEventListener("keypress", (event)=> {
    if (event.keyCode == 13) { //event.key = "Enter"
        inputTelefono.focus()
    }
})
datosImpresos();
focoEnCampos()