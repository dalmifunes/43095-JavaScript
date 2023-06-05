//alert("hola a todos");


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

let plata = prompt("ingrese el monto a retirar");

let cuenta = {nombre: "ejemplo", email: "@ejemplo", saldo: 10000};

let cuenta2 = {nombre: "ejemplo2", email: "@ejemplo2", saldo: 20000};

let cuenta3 = {nombre: "ejemplo3", email: "@ejemplo3", saldo: 22000};

let cuentas = [cuenta, cuenta2, cuenta3]



if(plata > cuentas[0].saldo) {
    alert("no tiene suficiente dinero en su cuenta, su saldo es de " + cuentas[0].saldo.toString())
}else{
    cuentas[0].saldo = cuentas[0].saldo - plata
    alert("el retiro se realizo con exito, le resta de saldo " + cuentas[0].saldo.toString()) 
}




















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



