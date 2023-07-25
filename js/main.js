class Billete {
  constructor(valor, cantidad, imagen) {
    this.valor = valor;
    this.cantidad = cantidad;
    this.imagen = imagen;
  }
}

class Usuario {
  constructor(id, nombre, apellido, saldo) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.saldo = saldo;
  }
}

class Saldo {
  constructor(usuario, valor) {
    this.usuario = usuario
    this.valor = valor
  }
}

const contenedorSesion = document.querySelector("#sesion");
const contenedorBanco = document.querySelector("#cajero");
const info = document.querySelector("#saldo");
const monto = document.querySelector("#monto");
const root = document.querySelector("#root");

function cambiarPantalla() {
  setTimeout(() => {
    loaderMest({
      status: false,
      spinnerBackground: "black",
      spinnerColor: "white",
      spinnerSize: "14px"
    });
  }, 3000)
  if (localStorage.getItem("usuario") != undefined) {
    alternarVisibilidad(root, contenedorSesion, false)
    alternarVisibilidad(root, contenedorBanco, true)
    const { nombre, apellido, saldo } = JSON.parse(localStorage.getItem("usuario"))
    info.innerHTML = `Hola ${nombre} ${apellido}. Su saldo es $${saldo}`;
  } else {
    alternarVisibilidad(root, contenedorBanco, false)
    alternarVisibilidad(root, contenedorSesion, true)
  }
}

function alternarVisibilidad(parent, element, mostrar) {
  if (mostrar) {
    if (!parent.contains(element)) parent.append(element)
  } else {
    if (parent.contains(element)) element.remove()
  }
}

async function configurarCajero() {
  if (localStorage.getItem("cajero") == undefined) {
    const respuesta = await fetch("./cajero.json")
    const cajero = await respuesta.json()
    localStorage.setItem("cajero", JSON.stringify(cajero));
  }
}

async function login(e) {
  e.preventDefault()

  loaderMest({
    status: true,
    spinnerBackground: "black",
    spinnerColor: "white",
    spinnerSize: "14px",
  });

  const formData = new FormData(e.target)
  const { usuario, contraseña } = Object.fromEntries(formData)
  const respuesta = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: usuario,
      password: contraseña
    })
  })

  if (respuesta.status === 200) {
    const usuarioDevuelto = await respuesta.json()
    autenticarUsuario(usuarioDevuelto)
    cambiarPantalla()
  }

  setTimeout(() => {
    document.querySelector(".ns-page-loading").remove();
  }, 2000)
}

function autenticarUsuario(usuarioDevuelto) {
  // La api no tiene un campo de saldo
  const saldoRandom = Math.floor(Math.random() * 10000)
  const usuarioLoggeado = new Usuario(usuarioDevuelto.id, usuarioDevuelto.firstName, usuarioDevuelto.lastName, saldoRandom)
  localStorage.setItem("usuario", JSON.stringify(usuarioLoggeado));
}

function logout() {
  loaderMest({
    status: true,
    spinnerBackground: "black",
    spinnerColor: "white",
    spinnerSize: "14px",
  });
  
  setTimeout(() => {
    document.querySelector(".ns-page-loading").remove();
  }, 2000)

  localStorage.removeItem("usuario");
  eliminarContenedoresExtra()
  cambiarPantalla();
}

function actualizarInformacion(billetes, montoDevuelto) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  usuario.saldo -= montoDevuelto;
  info.innerHTML = `Hola ${usuario.nombre} ${usuario.apellido}. Su saldo es $${usuario.saldo}`
  localStorage.setItem("usuario", JSON.stringify(usuario));

  const cajero = JSON.parse(localStorage.getItem("cajero"));

  for (billete of cajero) {
    for (billeteDevuelto of billetes) {
      if (billete.valor == billeteDevuelto.valor) {
        billete.cantidad -= billeteDevuelto.cantidad
      }
    }
  }

  localStorage.setItem("cajero", JSON.stringify(cajero));
}

function mostrarMensajeDeError(mensaje) {
  const error = document.createElement("span")
  error.classList.add("error")
  error.append(mensaje)
  contenedorBanco.append(error)
}

function mostrarDevuelto(devuelto) {
  const billetes = document.createElement("div")
  billetes.classList.add("billetes")

  const texto = document.createElement("h1")
  texto.classList.add("white")
  texto.append("Dinero retirado:")

  const separador = document.createElement("br")

  const contenedorBilletes = document.createElement("div")

  for (billete of devuelto) {
    for (let i = 0; i < billete.cantidad; i++) {
      const image = document.createElement("img");
      image.src = "imagenes/" + billete.imagen;
      image.classList.add("imagenBillete")
      contenedorBilletes.append(image)
    }
  }

  billetes.append(texto)
  billetes.append(separador)
  billetes.append(contenedorBilletes)

  root.append(billetes)
}

function eliminarContenedoresExtra() {
  const billetes = document.querySelector(".billetes")
  const error = document.querySelector(".error")
  if (billetes) billetes.remove()
  if (error) error.remove()
}

function devolver(cajero, montoADevolver, devuelto) {
  for (billete of cajero) {
    const cantidad = Math.floor(montoADevolver / billete.valor)
    if (cantidad > 0) {
      if (billete.cantidad >= cantidad) {
        devuelto.push(new Billete(billete.valor, cantidad, billete.imagen))
        montoADevolver -= billete.valor * cantidad
      } else {
        devuelto.push(new Billete(billete.valor, billete.cantidad, billete.imagen))
        montoADevolver -= billete.valor * billete.cantidad
      }
    }
  }
  return montoADevolver
}

function retirarDinero() {
  eliminarContenedoresExtra()

  const { saldo } = JSON.parse(localStorage.getItem("usuario"));
  const cajero = JSON.parse(localStorage.getItem("cajero"));

  const montoOriginal = monto.value
  let montoADevolver = montoOriginal

  const devuelto = []

  let dineroEnCajero = 0;
  for (let i = 0; i < cajero.length; i++) {
    dineroEnCajero += cajero[i].valor * cajero[i].cantidad
  }

  if (montoADevolver > saldo) {
    mostrarMensajeDeError("Saldo insuficiente")
    return
  }
  if (montoADevolver > dineroEnCajero) {
    mostrarMensajeDeError("El cajero no cuenta con el monto requerido")
    return
  }

  const deuda = devolver(cajero, montoADevolver, devuelto)

  if (deuda > 0) {
    mostrarMensajeDeError("El cajero no cuenta con los billetes necesarios para el monto requerido")
    return
  }

  mostrarDevuelto(devuelto)

  actualizarInformacion(devuelto, montoOriginal)
}

document.addEventListener("DOMContentLoaded", function () {
  configurarCajero();
  cambiarPantalla();
});