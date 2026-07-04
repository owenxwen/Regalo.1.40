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
const sonidoPop = new Audio("recursos/pop.mp3");

let ancho4 = (canvasGlobos2.width = window.innerWidth);
let alto4 = (canvasGlobos2.height = document.body.scrollHeight);

let globos2 = [];
let explosiones = [];

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
  const cantidad = 25;
  for (let i = 0; i < cantidad; i++) {
    const enPantalla = i < 30; // los primeros 10 arrancan en pantalla
    globos2.push({
      x: Math.random() * ancho4,
      y: enPantalla ? Math.random() * alto4 : Math.random() * alto4 + alto4,
      radioX: Math.random() * 15 + 20,
      radioY: Math.random() * 15 + 25,
      color: coloresGlobos2[Math.floor(Math.random() * coloresGlobos2.length)],
      velocidadY: Math.random() * 2.0 + 1.5,
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

  explosiones = explosiones.filter((exp) => {
    exp.particulas.forEach((p) => {
      p.x = (p.x || exp.x) + Math.cos(p.angulo) * p.velocidad;
      p.y = (p.y || exp.y) + Math.sin(p.angulo) * p.velocidad;
      p.alpha -= 0.05;

      ctxGlobos2.beginPath();
      ctxGlobos2.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
      ctxGlobos2.fillStyle = exp.color.replace("1)", `${p.alpha})`);
      ctxGlobos2.fill();
    });

    return exp.particulas.some((p) => p.alpha > 0);
  });

  requestAnimationFrame(animarGlobos2);
}

canvasGlobos2.addEventListener("click", (e) => {
  const rect = canvasGlobos2.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  let exploto = false;

  globos2 = globos2.filter((g) => {
    const dx = clickX - g.x;
    const dy = clickY - g.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    if (distancia <= g.radioX) {
      exploto = true;
      explosiones.push({
        x: g.x,
        y: g.y,
        color: g.color,
        particulas: Array.from({ length: 8 }, () => ({
          angulo: Math.random() * Math.PI * 2,
          velocidad: Math.random() * 4 + 2,
          radio: Math.random() * 5 + 3,
          alpha: 1,
        })),
      });
      const popSonido = sonidoPop.cloneNode();
      popSonido.play();
      return false;
    }
    return true;
  });

  if (!exploto) {
    canvasGlobos2.style.pointerEvents = "none";
    document.elementFromPoint(e.clientX, e.clientY).click();
    canvasGlobos2.style.pointerEvents = "auto";
  }
});

crearGlobos2();
setTimeout(() => {
  animarGlobos2();
}, 1500);