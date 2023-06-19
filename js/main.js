//alert("hola a todos");


class Billete {
    constructor(valor, cantidad, imagen) {
    this.valor = valor;
    this.cantidad = cantidad;
    this.imagen = imagen;
    }
}

class Usuario {
    constructor(nombre, contraseña, saldo) {
    this.nombre = nombre;
    this.contraseña = contraseña;
    this.saldo = saldo;
    }
}

const billetes = document.querySelector(".billetes");
const usuario = document.querySelector("#usuario");
const contraseña = document.querySelector("#contraseña");
const divSesion = document.querySelector("#sesion");
const divCajero = document.querySelector("#cajero");
const saldo = document.querySelector("#saldo");
const monto = document.querySelector("#monto");
const error = document.querySelector("#error");

function validarPantalla() {
    if (localStorage.getItem("usuario") != undefined) {
    divSesion.style.display = "none";
    divCajero.style.display = "flex";
    saldo.innerHTML = "Tu saldo es $" + JSON.parse(localStorage.getItem("usuario")).saldo;
    } else {
    divCajero.style.display = "none";
    divSesion.style.display = "flex";
    }
}

function validarCajero() {
    if (localStorage.getItem("cajero") == undefined) {
    const cajero = [];
    cajero.push(new Billete(100, 50, "100.png"));
    cajero.push(new Billete(50, 50, "50.png"));
    cajero.push(new Billete(20, 50, "20.png"));
    cajero.push(new Billete(10, 50, "10.png"));
    cajero.push(new Billete(5, 50, "5.png"));
    cajero.push(new Billete(1, 50, "1.png"));
    localStorage.setItem("cajero", JSON.stringify(cajero));
    }
}

function validarCredenciales() {
    if (localStorage.getItem("credenciales") == undefined) {
    const credenciales = [];
    credenciales.push(new Usuario("usuario1", "contraseña1", 1000));
    credenciales.push(new Usuario("usuario2", "1234567890", 10000));
    credenciales.push(new Usuario("usuario3", "banco", 4444));
    localStorage.setItem("credenciales", JSON.stringify(credenciales));
    }
}

function iniciarSesion() {
    for (const credencial of JSON.parse(localStorage.getItem("credenciales"))) {
    if (usuario.value == credencial.nombre && contraseña.value == credencial.contraseña) {
        localStorage.setItem("usuario", JSON.stringify(credencial));
        usuario.value = "";
        contraseña.value = "";
    }
    }
    validarPantalla();
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    billetes.innerHTML = "";
    error.innerHTML = "";
    error.style.display = "none";
    monto.value = "";
    validarPantalla();
}

function actualizarInformacion(billetes, montoDevuelto) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    usuario.saldo -= montoDevuelto;
    saldo.innerHTML = "Tu saldo es $" + usuario.saldo;
    localStorage.removeItem("usuario");
    localStorage.setItem("usuario", JSON.stringify(usuario));
    
    const credenciales = JSON.parse(localStorage.getItem("credenciales"));
    for (const credencial of credenciales) {
    if(credencial.nombre == usuario.nombre) {
        credencial.saldo -= montoDevuelto
    }
    }
    localStorage.removeItem("credenciales");
    localStorage.setItem("credenciales", JSON.stringify(credenciales));

    const cajero = JSON.parse(localStorage.getItem("cajero"));

    for (billete of cajero) {
    for(billeteDevuelto of billetes) {
        if(billete.valor == billeteDevuelto.valor) {
        billete.cantidad -= billeteDevuelto.cantidad
        }
    }
    }

    localStorage.removeItem("cajero");
    localStorage.setItem("cajero", JSON.stringify(cajero));
}

function retirarDinero() {
    billetes.innerHTML = "";
    error.innerHTML = "";
    error.style.display = "none";
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const cajero = JSON.parse(localStorage.getItem("cajero"));
    const montoOriginal = monto.value
    let montoADevolver = montoOriginal
    const devuelto = []
    let dineroEnCajero = 0;
    for (let i = 0; i < cajero.length; i++) {
      dineroEnCajero += cajero[i].valor * cajero[i].cantidad
    }
    if (montoADevolver > usuario.saldo) {
    error.style.display = "block";
    error.innerHTML = "Saldo insuficiente";
    return
    }
    if (montoADevolver > dineroEnCajero) {
    error.style.display = "block";
    error.innerHTML = "El cajero no cuenta con el monto requerido";
    return
    }
    for (billete of cajero) {
    const cantidad = Math.floor(montoADevolver / billete.valor)
    if (cantidad > 0) {
        if(billete.cantidad >= cantidad) {
        devuelto.push(new Billete(billete.valor, cantidad, billete.imagen))
          montoADevolver -= billete.valor * cantidad
        } else {
        devuelto.push(new Billete(billete.valor, billete.cantidad, billete.imagen))
          montoADevolver -= billete.valor * billete.cantidad
        }
    }
    }
    if (montoADevolver > 0) {
    error.style.display = "block";
    error.innerHTML = "El cajero no cuenta con los billetes necesarios para el monto requerido";
    return
    }
    const texto = document.createElement("h1")
    texto.style.color = "white"
    texto.innerHTML = "Dinero retirado:"
    const separador = document.createElement("br")
    const contenedorBilletes = document.createElement("div")
    billetes.append(texto)
    billetes.append(separador)
    billetes.append(contenedorBilletes)
    for (billete of devuelto) {
    for(let i = 0; i < billete.cantidad; i++) {
        const image = document.createElement("img");
        image.src = "imagenes/" + billete.imagen;
        image.className = "imagenBillete"
        contenedorBilletes.append(image)
    }
    }

    actualizarInformacion(devuelto, montoOriginal)
}

document.addEventListener("DOMContentLoaded", function () {
    validarCajero();
    validarCredenciales();
    validarPantalla();
});




































