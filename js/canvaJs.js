'use strict'
//Obtener el contexto del canva para poder trabajar en base a ello
const canvaDOM = document.getElementById("lienzo");
const contexto = canvaDOM.getContext("2d");
//Figuras
var figuras = [];
var textoArray = [];
 textoArray.push({
        x:0,
        y:0,
        fuente: "40px Arial",
        color: "red",
        texto: "Texto...",
        tipo:"cabezera"
    });
    textoArray.push({
        x:0,
        y:0,
        fuente: "20px Arial",
        color: "black",
        texto: "Texto...",
        tipo:"contenido"
    });
let figuraIndice =  null;
let dragg =  false;
let sX;
let sY;
//zindex relativo
var ind = 0;
/*--------------------------------------------------------------------------*/
//Eventos de los botones
 let divRect =  document.querySelector(".rectangulo");
 let divCabezera= document.querySelector(".cabezera");
 let divLeyenda= document.querySelector(".leyenda");
 let divClasico =  document.querySelector(".clasico");
 let divContenido =  document.querySelector(".contenido");
 let divVintage =  document.querySelector(".vintage");
 let divBorrar =  document.querySelector("#borrar");
//Valores de radiobox
let rectAltura = document.querySelector("#rectAltura");
let rectAncho = document.querySelector("#rectAncho");
let cabeAltura = document.querySelector("#cabeAltura");
let cabeAncho =  document.querySelector("#cabeAncho");
let leyeAltura = document.querySelector("#leyeAltura");
let leyeAncho = document.querySelector("#leyeAncho");
let conteAltura = document.querySelector("#conteAltura");
let conteAncho = document.querySelector("#conteAncho");
let boton = document.querySelector("#subir");
//Texto
let txtCabezera =  document.querySelector("#txtCabeza");
let txtContenido  = document.querySelector("#txtContenido");
let btnGuardar = document.querySelector("#guardarTexto");
btnGuardar.addEventListener("click", ()=>{
    for(let i of textoArray){
        if(i.tipo =="cabezera"){
            i.texto = txtCabezera.value;
        }else if(i.tipo == "contenido"){
            i.texto = txtContenido.value;
        }
    }
    ImprimirTexto();
})
boton.addEventListener("click", ()=>{
    for(let i of figuras){
        if(i.tipo =="contenedor"){
                i.width = rectAncho.value*40 + 425;
                i.height = rectAltura.value*38+ 525;
         }else if (i.tipo =="cabezera"){
                i.width = cabeAncho.value*40 + 375;
                i.height = cabeAltura.value*38+ 100;
        }else if (i.tipo == "leyenda"){
                i.width = leyeAncho.value*40+ 375;
                i.height =leyeAltura.value*10+ 100;
        }else{
             i.width = conteAncho.value*10 + 325;
                i.height =conteAltura.value*6+ 425;
        }
    }
    dibujar();
    ImprimirTexto();
});
 divClasico.addEventListener("click", ()=>{
    if(figuras !== null){
        for(let i of figuras){
            if(i.tipo =="contenedor"){
                i.color = "#D8D8D8";
            }else if (i.tipo =="cabezera"){
                i.color ="#274292";
            }else if (i.tipo =="leyenda"){
                i.color = "yellow";
            }else{
                i.color = "darkblue";
            }
        }
    }
    for(let i of textoArray){
        if(i.tipo =="cabezera"){
            i.color = "aliceblue";
        }else{
            i.color = "aliceblue";
        }
    }
    dibujar();
    ImprimirTexto();
 });
 divVintage.addEventListener("click", ()=>{
    if(figuras !== null){
        for(let i of figuras){
            if(i.tipo =="contenedor"){
                i.color = "#D4A373";
            }else if (i.tipo =="cabezera"){
                i.color ="#E2725B";
            }else if (i.tipo =="leyenda"){
                i.color = "#A3B18A";
            }else{
                i.color = "#6C757D";
            }
        }
    }
    for(let i of textoArray){
        if(i.tipo =="cabezera"){
            i.color = "#FAF3E0";
        }else{
            i.color = "#4E342E";
        }
    }
    dibujar();
    ImprimirTexto();
 });
 divBorrar.addEventListener("click", ()=>{
    contexto.clearRect(0,0,canvaDOM.width,canvaDOM.height);
    figuras = [];
    //No supe como resetear el texto jaja, ya que yo quiero que siga saliendo "texto..."
    textoArray.forEach(obj =>{
        obj.x = -12;
        obj.y = -12;
    })
 })

 divRect.addEventListener("click", ()=>{
    ind++;
    figuras.push(
        {
            x: 0,
            y:0,
            color: "red",
            width:425,
            height:525,
            zindex:ind, 
            tipo: "contenedor"
        }
    )
    dibujar();
 })
 divCabezera.addEventListener("click", ()=>{
    ind++;
    figuras.push(
        {
            x: 0,
            y:0,
            width:375,
            color: "blue",
            height:100,
            zindex:ind,
            tipo: "cabezera"
        }
    )
    dibujar();
})
divLeyenda.addEventListener("click", ()=>{
    ind++;
    figuras.push({
            x: 0,
            y:0,
            width:375,
            color: "green",
            height:100,
            zindex:ind,
            tipo: "leyenda"
    })
    dibujar();
});
divContenido.addEventListener("click", ()=>{
    ind++;
    figuras.push({
          x: 0,
            y:0,
            width:325,
            color: "purple",
            height:425,
            zindex:ind,
            tipo: "contenido"
    })
    dibujar();
})
/*--------------------------------------------------------------------------*/
//Declaro la funciones como variables para poder pasarlas como valor a los eventos (Nueva forma)
const dibujar = function(){
    //Primero limpiar lo anterior
    contexto.clearRect(0,0,canvaDOM.width,canvaDOM.height);
    for (let i of figuras){
        contexto.fillStyle = i.color;
        contexto.fillRect(i.x,i.y,i.width,i.height);
    }
}
function ImprimirTexto(){
    let itera = coordenadasPadre(textoArray);
    dibujar();
    for(let i of itera){
        // Estilo del texto
        contexto.font = i.fuente;
        contexto.fillStyle = i.color;
        contexto.fillText(i.texto, i.x, i.y);
    }
}
function coordenadasPadre(texto){
    let texto2 =  texto;
    let indice = 0;
    for(let i of figuras){
        if(i.tipo == texto2[indice].tipo){
            texto2[indice].x = i.x+15;
            texto2[indice].y = i.y +40;
            indice = 0;
        }else{
            indice++;
            if(i.tipo == texto2[indice].tipo){
                texto2[indice].x = i.x+15;
                texto2[indice].y = i.y +20;
                indice = 0;
            }else{
                indice = 0;
            }
        }
    }
    return texto2;
}
//Función para saber en que elemento presione
const mousedentroFigura = function(x,y, figura){
    //Consiguiendo los vertices de la figura
    let figuraIzq = figura.x;
    let figuraDer = figura.x + figura.width;
    let figuraTop = figura.y;
    let figuraAbajo= figura.y +figura.height;
    if(x>figuraIzq && x < figuraDer && y> figuraTop && y< figuraAbajo){
        return true;
        //Ya dónde se preciono es dentro de la figura
    }
    return false;
}
const mouseDown = function(event) {
  event.preventDefault();
    sX = parseInt(event.offsetX);
    sY = parseInt(event.offsetY);
    //Valores para reconocer el zindex mayor
    let figuraSeleccionada = null;
    //Algo especial de JS, dónde yo hago que zMax tenga el valor mas bajo posible
    let zMax = -Infinity;
    let mejorIndice = -1;

    for (let i = 0; i < figuras.length; i++) {
        let figura = figuras[i];
        //Primero compruebo que el valor seleccionado con el mouse este dentro de la figura
        if (mousedentroFigura(sX, sY, figura)) {
            //Algoritmo para determinar el valor más grande 
            if (figura.zindex > zMax) {
                zMax = figura.zindex;
                figuraSeleccionada = figura;
                mejorIndice = i;
            }
        }
    }
    //Si es estrictamente diferente de nullo, se le da el status de drageable y el elemnto a dragear
    if (figuraSeleccionada !== null) {
        figuraIndice = mejorIndice;
        dragg = true;
    }

}
const mouseUp = function(evt){
    //Si se saca el presionado izquierdo, entonces ya no está draggeando
    if(!dragg){
        return;
    }
    evt.preventDefault();
    dragg =false;
}
//Lo mismo para cuando se salga del canvas area
const mouseOut = function(evt){
    if(!dragg){
        return;
    }
    evt.preventDefault();
    dragg =false;
}
const mouseMove  =function (evt){
    //Si no esta drageando no me importa realizar este listener
    if(!dragg){
        return;
    }else{
        evt.preventDefault();
        //Conozco las coordenadas del movimiento (se actualizan a medida que yo muevo el mouse)
        let mouseX  = evt.offsetX;
        let mouseY = evt.offsetY;
        //Reseteo de coordenada con sX y sY que es dónde se dio mousedown (MOUSEDOWN SOLO SE ACTIVA UNA VEZ, mousemove cada vez que se mueva la vaina)
        let dx = mouseX-sX;
        let dy = mouseY-sY
        //Dado que guarde el indice de la figura, ahora le ire sumando el dx y dy
        let figuraAhora = figuras[figuraIndice]
        figuraAhora.x +=dx;
        figuraAhora.y += dy;
        //Cada iteración, ire dibujando TODO de nuevo
        dibujar();
        ImprimirTexto();
        //Refrezco el nuevo sX y nuevo sY cada iteración de movimiento del mouse
        sX = mouseX;
        sY = mouseY;
    }
}
//Otra forma de verlo, siempre añade un listener solo que no es más flexible como el metodo addEventListener
canvaDOM.onmousedown = mouseDown;
canvaDOM.onmouseup = mouseUp;
canvaDOM.onmouseout = mouseOut;
canvaDOM.onmousemove = mouseMove;

// //Parametros del rectangulo fillRect(x, y, width, height). Rectangulo relleno
//Dibuja el contorno del rectangulo strokeRect(x, y, width, height)
//Borra el rectangulo clearRect(x, y, width, height) haciendolo transparente


