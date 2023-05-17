alert("hola a todos");


let valorIngresado = parseInt(prompt("ingrese el monto del dinero a retirar:"));

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


    

    
