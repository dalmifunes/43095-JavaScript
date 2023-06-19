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
































/*let valorIngresado = parseInt(prompt("ingrese el monto del dinero a retirar:"));

let valorDevuelto = 0;

const cantidadBilletes = 100;

const valorBillete = 1;

for (let i = 1; i <= cantidadBilletes; i++) {
    if (valorDevuelto < valorIngresado) {
        valorDevuelto = valorDevuelto + valorBillete
    } else {
        break;
    }
}

if (valorDevuelto == valorIngresado) {
    alert("El cajero ha devuelto el dinero")
} else {
    alert("El cajero no cuenta con plata suficiente")
}*/
    


/* class Dinero {
    constructor(valor, cantidad) {
        this.valor
        this.cantidad
    }
}

let billete1 = new Dinero(1, 100);
let billete5 = new Dinero(5, 100);
let billete10 = new Dinero(10, 100);
 */
/* function devolverDinero(valorIngresado) {
    for (let i = 1; i <= cantidadBilletes; i++) {
        if (valorDevuelto < valorIngresado) {
            valorDevuelto = valorDevuelto + valorBillete
        } else {
            break;
        }
    }
    
    if (valorDevuelto == valorIngresado) {
        alert("El cajero ha devuelto el dinero")
    } else {
        alert("El cajero no cuenta con plata suficiente")
    }
} */






















/*let nombre = "Dalmiro"; 
let apellido = "FUnes";
var edad= "19";
const anioNacimiento = 2004

console.log(nombre);
console.log(apellido);
console.log(anioNacimiento);


let numeroA = 10;
let numeroB = 20;
let numeroC = 30;


var resultado = numeroA + numeroB
console.log(resultado);


/*let nombreingresado = prompt("ingrese su nombre:");
let apellido = prompt("ingrese su apellido":);
alert("nombre: " + nombreingresado + "  " + apellido);*/


//console.log("inicio");

//let i;

//for (let  i= 0;  i<=10;  i=++) {
    //alert("hola a todos! #" + i;);
    
//}



/*let edad = parseInt (prompt("cual es su edad"));
console.log(edad);
console.log(typeof edad);

if (edad >= 18) {
    alert("podes tomar alcohol")
} else{
    alert("prohibido no podes")
} */

//creando objeto
/*let nombre = "dalmiro"
let apellido = "funes"
let edad = 19
const persona1 = {nombre:nombre, apellido:apellido, edad:edad, fechaNacimiento: "8-3-2004"};
console.log(persona1);*/


//accediendo a los datos

/*const persona = {
nombre: "dalmiro funes",
edad:  19,
direccion: "artigas 1717",
Sdni: 45478067,
}; 

function mostrardatos() {
    console.log("nombre: ", + persona.nombre);
    console.log("edad: ", + persona.edad);
    console.log("direccin ", + persona.direccion);
}

if (persona.edad >= 18) {
    mostrardatos();

} else {
    console.log("no te muestro, es menor de edad!");
}*/

//constructores

/*function persona(nombrepersona, edadpersona, direccionpersona) {
    this.nombre = nombrepersona;
    this.edad   = edadpersona;
    this.direccion = direccionpersona; 
}

const persona1 = new persona("dalmiro funes", 19, "artigas 1717");
const persona2 = new persona("liones messi", 35, "barcelona" );
console.log(persona1);
console.log(persona2);*/

//clases

/*class persona {
    constructor(nombrepersona, edadpersona, direccionpersona) {
        this.nombre = nombrepersona;
        this.edad = edadpersona;
        this.direccion = direccionpersona
    }
    saludar() {
        alert("hola soy" + this.nombre);
    }
    sosmayor(edad) {
        if (this.edad >= edad) {
            alert("si, soy mayor")
        } else {
            alert("sos menor");
        }
    }
}

const persona1 = new persona("dalmiro funes", 19, "artigas 1717");
console.log(persona1);
persona1.saludar();
persona1.sosmayor(18);*/


// arrays

//let lista = ["dalmiro", "funes", "dalmirofunes@gmail.com", 19];
//console.log(lista);

/*let edad = lista[3] + 1;
console.log("mi email es: " + lista[2]);
console.log("mi edad va a ser: " + edad);*/

//recorrer arrAY

/*for (let i=0; i<4; i++) {
    alert(lista[i]);

}*/

//let cantidadDatos = lista.lenght
//for (let i=0; i<cantidadDatos; i++) {
//alert(lista[i]); 

//metodo push
/*let nuevonombre = prompt("decime tu nombre");
lista.push(nuevonombre);
lista.push("julian");
lista.push(22);
lista.push({id:1, nombre:"cocacola", precio:700});
console.log(lista);*/

//metodo unshift = pone el elemento primero
/*let nuevonombre2 = prompt("decime tu nombre");
lista.unshift(nuevonombre2);
console.log(lista);*/

// pop quita ell ultimo elemento y lo devuelve
/*let valor = lista.pop();
console.log(lista);
console.log(valor);*/

// shift quita ell primer elemento y lo devuelve
/*let valor = lista.shift();
console.log(lista);
console.log(valor);*/

//metodo splice
/*lista.splice(1,2);
console.log(lista);*/

//concatenando arrays en unos solo

/*let perros = ["rocky", "pepa", "tito"];
let gatos = ["saika", "garfield", "ron"];
let mascotas = perros.concat(gatos);
console.log(mascotas);*/ 


//recorriendo arrays
/*const listanombres = ["enzo", "valentino", "julian"];
const productos = [
    {id:1, nombre: "cocacola", precio:700},
    {id:2, nombre:"pepsi", precio:500},
    {id:3, nombre:"manaos", precio:200},

];

for (const nombre of listanombres){
    console.log("nombre: " + nombre);
}

for (const producto of productos) {
    console.log("nombre: " + producto.nombre + "- precio: $" + (producto.precio));
}*/

/*class producto {
    constructor(nombre, precio) {
        this.nombre = nombre.toUpperCase(),
        this.precio = precio;
    }
    sumaiva() 
        this.precio = this.precio * 1.21;
    }
}

const productos = [];
productos.push(new producto("cocacola", 700));
productos.push(new producto("pepsi", 500));
productos.push(new producto("manaos", 300));
console.log(productos);

for (const producto of productos) {
    producto.sumaiva();
}
console.log(productos);*/


//ejemplo funciones
/*function mayorque(n) {
    return m => m > n;
}

let mayorque10 = mayorque(5)
console.log(mayorque10(15));
console.log(mayorque10(3));*/


//ejemplo 2
/*function devolveroperacion(op) {
    if (op == "suma") {
        return (a, b) => a + b;
    } else if (op == "resta") {
        return (a, b) => a - b;
    } else {
        return 0;
    }
}

const suma = devolveroperacion("summa"); 
let resultado = suma(10, 20);
const resta = devolveroperacion("resta");
let resultado2 = resta(30, 20);
console.log("el resultado es: " + resultado);
console.log("el resultado2 es: " + resultado2);*/

//ejemplo3

/*const numeros = [1, 2, 3, 4];

const porcadauno = (lista, funcion) => {
    for (const elemento of lista) {
        function("elemento :" + elemento); 
    }
}

porcadauno(numeros, console.log);*/



//metodos de busqueda y transfformacion
//foreach recorre cada uno de los elementos de un array 
/*const numeros = [1, 2, 3, 4];
const productos = [
    {id:1, nombre: "cocacola", precio: 700, categoria:"premium" },
    {id:2, nombre: "pepsi", precio: 500, categoria:"premium" },
    {id:3, nombre: "manaos", precio: 350, categoria: "premium" },
];*/

/*productos.forEach(item => {
    alert("nombre: " + item.nombre + "- precio: $" + item.precio);
})*/

//metodo find devuelve el primer elemento encontrado

/*let producto = productos.find(elemento => elemento.nombre === "pepsi"); //busco por nombre
console.log(producto);
let producto2 = productos.find(elemento => elemento.precio == 700); //busco por precio
console.log(producto2);
let producto3 = productos.find(elemento => elemento.id == 3); //busco por id
console.log(producto3);*/

//metodo filter devuelve un nuevo array depende la condicion que definamos

/*let productospremium = productos.filter(item => item.categoria == "premium");
console.log(productospremium);
let nuevosproductos = productos.filter(item.id !== 3);
console.log(nuevosproductos);*/



