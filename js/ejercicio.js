let confirmacion = prompt('Quieres comprar algo? si/no ');
if (confirmacion === 'si'){
    let producto = prompt ('que quieres comprar? zapatos o borcegos?');
    if (producto === 'zapatos'){
        console.log('Te salen 2000 pesos');
    } else if (producto === 'borcegos'){
        console.log('Te salen 5000 pesos');
    } else {
        console.log('No tenemos ese producto');
    }
}
if (confirmacion === 'no') console.log('Gracias por visitar nuestra tienda');