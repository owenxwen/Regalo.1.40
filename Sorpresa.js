// Carta
const regalo = document.querySelector(".regalo");
const regalos = document.querySelector(".regalos");
const modalCarta = document.getElementById("modalCarta");
const sonidoRegalo = new Audio("recursos/regalo.mp3");
const cancion2 = new Audio("recursos/cancion2.mp3");
cancion2.volume = 0.5;
cancion2.loop = true;

const sonidoVela = new Audio("recursos/vela.mp3");
const sonidoMordisco = new Audio("recursos/mordisco.mp3");

regalo.addEventListener("click", () => {
  modalCarta.classList.add("activo");
  const popRegalo = sonidoRegalo.cloneNode();
  popRegalo.play();
});

regalos.addEventListener("click", () => {
  modalCarta.classList.add("activo");
  const popRegalo2 = sonidoRegalo.cloneNode();
  popRegalo2.play();
});

modalCarta.addEventListener("click", () => {
  modalCarta.classList.remove("activo");
});

// Todo Oscuro + Soplido + Canción
const overlay = document.querySelector(".overlay");
const soplido = document.getElementById("soplido");
const cancion = document.getElementById("cancion");
const llama = document.querySelector(".llama");
const velaOverlay = document.querySelector(".vela-overlay");
const mecha = document.querySelector(".mecha");

llama.addEventListener("click", (e) => {
  e.stopPropagation();
  soplido.currentTime = 0;
  soplido.play();

  llama.style.animation = "apagar 0.5s forwards";
  velaOverlay.style.animation = "apagar 0.0s forwards";

  setTimeout(() => {
    cancion.currentTime = 0;
    cancion.volume = 0.2;
    cancion.play();
    overlay.classList.add("hidden");
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.maxHeight = "3000px";
  }, 1000);
});

cancion.addEventListener("ended", () => {
  cancion2.play();
});

velaOverlay.addEventListener("click", (e) => {
  e.stopPropagation();
});

mecha.addEventListener("click", (e) => {
  e.stopPropagation();
  llama.style.animation = "flama 0.15s infinite alternate ease-in-out";
  velaOverlay.style.animation = "";
});

const tortaWrapper = document.querySelector(".torta-wrapper");
const velaElem = document.querySelector(".vela");
let clicksPastel = 0;

function soltarMigajas() {
  const pastel = tortaWrapper.getBoundingClientRect();
  const mesa = document.querySelector(".soporte").getBoundingClientRect();
  const colores = ["#FDE8C8", "#ff9393", "#ff5959"];

  for (let i = 0; i < 22; i++) {
    const migaja = document.createElement("span");
    migaja.classList.add("migaja");

    const inicioX = pastel.left + pastel.width * (0.25 + Math.random() * 0.55);
    const inicioY = pastel.top + window.scrollY + pastel.height * (0.45 + Math.random() * 0.2);
    const finX = inicioX + (Math.random() * 180 - 90);
    const finY = mesa.top + window.scrollY - 12;
    const tamano = 10 + Math.random() * 10;
    const duracion = 700 + Math.random() * 500;

    migaja.style.setProperty("--inicio-x", `${inicioX}px`);
    migaja.style.setProperty("--inicio-y", `${inicioY}px`);
    migaja.style.setProperty("--fin-x", `${finX}px`);
    migaja.style.setProperty("--fin-y", `${finY}px`);
    migaja.style.setProperty("--tamano", `${tamano}px`);
    migaja.style.setProperty("--duracion", `${duracion}ms`);
    migaja.style.setProperty("--rotacion", `${Math.random() * 360}deg`);
    migaja.style.setProperty(
      "--color-migaja",
      colores[Math.floor(Math.random() * colores.length)]
    );

    document.body.appendChild(migaja);
  }
}

tortaWrapper.addEventListener("click", () => {
  clicksPastel++;

  if (clicksPastel === 1) {
    velaElem.style.display = "none";
    velaOverlay.style.display = "none";
    llama.style.display = "none";
    sonidoVela.play();
  } else if (clicksPastel === 2) {
    tortaWrapper.style.clipPath = "inset(0 0 0 25%)";
    soltarMigajas();
    const mordisco = sonidoMordisco.cloneNode();
    mordisco.play();
  } else if (clicksPastel === 3) {
    tortaWrapper.style.clipPath = "inset(0 0 0 50%)";
    soltarMigajas();
    const mordisco = sonidoMordisco.cloneNode();
    mordisco.play();
  } else if (clicksPastel === 4) {
    tortaWrapper.style.clipPath = "inset(0 0 0 75%)";
    soltarMigajas();
    const mordisco = sonidoMordisco.cloneNode();
    mordisco.play();
  } else if (clicksPastel === 5) {
    tortaWrapper.style.clipPath = "inset(0 0 0 100%)";
    soltarMigajas();
    const mordisco = sonidoMordisco.cloneNode();
    mordisco.play();
  }
});
