// Globos Atrás

window.oncontextmenu = function () {
  return false;
};

window.addEventListener("resize", () => {
  ancho4 = canvasGlobos2.width = window.innerWidth;
  alto4 = canvasGlobos2.height = document.body.scrollHeight;
});

const canvasGlobos2 = document.getElementById("canvas4");
const ctxGlobos2 = canvasGlobos2.getContext("2d");

let ancho4 = (canvasGlobos2.width = window.innerWidth);
let alto4 = (canvasGlobos2.height = document.body.scrollHeight);

let globos2 = [];

const coloresGlobos2 = [
  "rgba(255, 179, 71, 1)",
  "rgba(240, 140, 60, 1)",
  "rgba(200, 230, 180, 1)",
  "rgba(150, 200, 130, 1)",
  "rgba(255, 210, 140, 1)",
  "rgba(220, 245, 210, 1)",
  "rgb(248, 231, 231)",
];

function crearGlobos2() {
  const cantidad = 15;
  for (let i = 0; i < cantidad; i++) {
    globos2.push({
      x: Math.random() * ancho4,
      y: Math.random() * alto4 + alto4,
      radioX: Math.random() * 15 + 20,
      radioY: Math.random() * 15 + 25,
      color: coloresGlobos2[Math.floor(Math.random() * coloresGlobos2.length)],
      velocidadY: Math.random() * 1.5 + 0.5,
      velocidadX: (Math.random() - 0.5) * 0.5,
      hiloLargo: Math.random() * 30 + 40,
    });
  }
}

function animarGlobos2() {
  ctxGlobos2.clearRect(0, 0, ancho4, alto4);

  for (let i = 0; i < globos2.length; i++) {
    let g = globos2[i];

    // Dibujar globo
    ctxGlobos2.beginPath();
    ctxGlobos2.ellipse(g.x, g.y, g.radioX, g.radioY, 0, 0, Math.PI * 2);
    ctxGlobos2.fillStyle = g.color;
    ctxGlobos2.fill();

    // Triangulito abajo del globo
    ctxGlobos2.beginPath();
    ctxGlobos2.moveTo(g.x - 5, g.y + g.radioY);
    ctxGlobos2.lineTo(g.x + 5, g.y + g.radioY);
    ctxGlobos2.lineTo(g.x, g.y + g.radioY + 8);
    ctxGlobos2.fillStyle = g.color;
    ctxGlobos2.fill();

    // Hilo
    ctxGlobos2.beginPath();
    ctxGlobos2.moveTo(g.x, g.y + g.radioY + 8);
    ctxGlobos2.quadraticCurveTo(
      g.x + 10,
      g.y + g.radioY + g.hiloLargo / 2,
      g.x,
      g.y + g.radioY + g.hiloLargo
    );
    ctxGlobos2.strokeStyle = "rgba(100, 100, 100, 0.6)";
    ctxGlobos2.lineWidth = 1;
    ctxGlobos2.stroke();

    // Brillito
    ctxGlobos2.beginPath();
    ctxGlobos2.ellipse(g.x - g.radioX * 0.3, g.y - g.radioY * 0.3, g.radioX * 0.15, g.radioY * 0.15, 0, 0, Math.PI * 2);
    ctxGlobos2.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctxGlobos2.fill();

    // Movimiento
    g.y -= g.velocidadY;
    g.x += g.velocidadX;

    // Reaparece abajo cuando sale por arriba
    if (g.y + g.radioY + g.hiloLargo < 0) {
      g.y = alto4 + g.radioY + g.hiloLargo;
      g.x = Math.random() * ancho4;
    }
  }

  requestAnimationFrame(animarGlobos2);
}

crearGlobos2();
setTimeout(() => {
  animarGlobos2();
}, 1500);