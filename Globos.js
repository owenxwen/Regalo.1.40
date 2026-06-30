// Globos Atrás

window.oncontextmenu = function () {
  return false;
};

window.addEventListener("resize", () => {
  ancho3 = canvasGlobos.width = window.innerWidth;
  alto3 = canvasGlobos.height = document.body.scrollHeight;
});

const canvasGlobos = document.getElementById("canvas3");
const ctxGlobos = canvasGlobos.getContext("2d");

let ancho3 = (canvasGlobos.width = window.innerWidth);
let alto3 = (canvasGlobos.height = document.body.scrollHeight);

let globos = [];

const coloresGlobos = [
  "rgba(255, 179, 71, 1)",
  "rgba(240, 140, 60, 1)",
  "rgba(200, 230, 180, 1)",
  "rgba(150, 200, 130, 1)",
  "rgba(255, 210, 140, 1)",
  "rgba(220, 245, 210, 1)",
  "rgb(228, 231, 231)",
];

function crearGlobos() {
  const cantidad = 15;
  for (let i = 0; i < cantidad; i++) {
    globos.push({
      x: Math.random() * ancho3,
      y: Math.random() * alto3 + alto3,
      radioX: Math.random() * 15 + 20,
      radioY: Math.random() * 15 + 25,
      color: coloresGlobos[Math.floor(Math.random() * coloresGlobos.length)],
      velocidadY: Math.random() * 1.5 + 0.5,
      velocidadX: (Math.random() - 0.5) * 0.5,
      hiloLargo: Math.random() * 30 + 40,
    });
  }
}

function animarGlobos() {
  ctxGlobos.clearRect(0, 0, ancho3, alto3);

  for (let i = 0; i < globos.length; i++) {
    let g = globos[i];

    // Dibujar globo
    ctxGlobos.beginPath();
    ctxGlobos.ellipse(g.x, g.y, g.radioX, g.radioY, 0, 0, Math.PI * 2);
    ctxGlobos.fillStyle = g.color;
    ctxGlobos.fill();

    // Triangulito abajo del globo
    ctxGlobos.beginPath();
    ctxGlobos.moveTo(g.x - 5, g.y + g.radioY);
    ctxGlobos.lineTo(g.x + 5, g.y + g.radioY);
    ctxGlobos.lineTo(g.x, g.y + g.radioY + 8);
    ctxGlobos.fillStyle = g.color;
    ctxGlobos.fill();

    // Hilo
    ctxGlobos.beginPath();
    ctxGlobos.moveTo(g.x, g.y + g.radioY + 8);
    ctxGlobos.quadraticCurveTo(
      g.x + 10,
      g.y + g.radioY + g.hiloLargo / 2,
      g.x,
      g.y + g.radioY + g.hiloLargo
    );
    ctxGlobos.strokeStyle = "rgba(100, 100, 100, 0.6)";
    ctxGlobos.lineWidth = 1;
    ctxGlobos.stroke();

    // Brillito
    ctxGlobos.beginPath();
    ctxGlobos.ellipse(g.x - g.radioX * 0.3, g.y - g.radioY * 0.3, g.radioX * 0.15, g.radioY * 0.15, 0, 0, Math.PI * 2);
    ctxGlobos.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctxGlobos.fill();

    // Movimiento
    g.y -= g.velocidadY;
    g.x += g.velocidadX;

    // Reaparece abajo cuando sale por arriba
    if (g.y + g.radioY + g.hiloLargo < 0) {
      g.y = alto3 + g.radioY + g.hiloLargo;
      g.x = Math.random() * ancho3;
    }
  }

  requestAnimationFrame(animarGlobos);
}

crearGlobos();
setTimeout(() => {
  animarGlobos();
}, 1500);