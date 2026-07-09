// Confetis

//
// 1. Configuración Inicial
window.oncontextmenu = function () {
  return false;
};

window.addEventListener("resize", () => {
  ancho = canvasConfeti.width = window.innerWidth;
  alto = canvasConfeti.height = document.body.scrollHeight;
});

const canvasConfeti = document.getElementById("canvas1"); //Lienzo
const ctxConfeti = canvasConfeti.getContext("2d"); // Funciones

let ancho = (canvasConfeti.width = window.innerWidth);
let alto = (canvasConfeti.height = document.body.scrollHeight);

let confetis = [];

const coloresConfeti = [
  "rgba(255, 179, 71, 1)",   // naranja pastel
  "rgba(240, 140, 60, 1)",   // naranja medio
  "rgba(200, 230, 180, 1)",  // verde cremita claro
  "rgba(150, 200, 130, 1)",  // verde cremita medio
  "rgba(255, 210, 140, 1)",  // naranja muy suave
  "rgba(220, 245, 210, 1)",  // verde muy claro
  "rgba(255, 255, 255, 1)",  // blanco
];

//
// 2. Crear Confeti
//
function crearConfeti() {
  const cantidad = 100;
  for (let i = 0; i < cantidad; i++) {
    confetis.push({
      x: Math.random() * ancho, // Posición Horizontal Aleatoria
      y: Math.random() * -alto, // Posición Vertical Aleatoria (Desde arriba por el negativo)
      r: Math.random() * 5 + 2, // Radio Aleatorio (2 y 7 Pixeles)
      color: coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)],
      velocidadY: Math.random() * 2 + 1, // Velocidad Aleatoria (1 y 3 Pixeles/Frame)
    });
  }
}

//
// 3. Dibujar y Mover Confeti
//
function animarConfeti() {
  ctxConfeti.fillStyle = "#adebb3"; // verde cremita
  ctxConfeti.fillRect(0, 0, ancho, alto);

  for (let i = 0; i < confetis.length; i++) {
    let confetiActual = confetis[i];

    ctxConfeti.beginPath(); // Empezamos Una Nueva Figura
    ctxConfeti.arc(
      confetiActual.x,
      confetiActual.y,
      confetiActual.r,
      0,
      Math.PI * 2
    ); // Dibujamos Un Círculo
    ctxConfeti.fillStyle = confetiActual.color; // Color
    ctxConfeti.fill(); // Rellenamos El Círculo

    // Movimiento (Caída Libre)
    confetiActual.y += confetiActual.velocidadY;

    // Si Termina De Caer, Aparece Arriba Nuevamente
    if (confetiActual.y > alto) {
      confetiActual.y = -10;
      confetiActual.x = Math.random() * ancho;
    }
  }

  // Animación Continua (Llama de nuevo a la función)
  requestAnimationFrame(animarConfeti);
}

crearConfeti();

// Esperar 1 segundo antes de iniciar el confeti
setTimeout(() => {
  animarConfeti();
}, 1500);
