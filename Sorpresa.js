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

tortaWrapper.addEventListener("click", () => {
  clicksPastel++;

  if (clicksPastel === 1) {
    velaElem.style.display = "none";
    velaOverlay.style.display = "none";
    llama.style.display = "none";
    sonidoVela.play();
  } else if (clicksPastel === 2) {
    tortaWrapper.style.clipPath = "inset(0 0 0 25%)";
    const mordisco = sonidoMordisco.cloneNode();
    mordisco.play();
  } else if (clicksPastel === 3) {
    tortaWrapper.style.clipPath = "inset(0 0 0 50%)";
    const mordisco = sonidoMordisco.cloneNode();
    mordisco.play();
  } else if (clicksPastel === 4) {
    tortaWrapper.style.clipPath = "inset(0 0 0 75%)";
    const mordisco = sonidoMordisco.cloneNode();
    mordisco.play();
  } else if (clicksPastel === 5) {
    tortaWrapper.style.clipPath = "inset(0 0 0 100%)";
    const mordisco = sonidoMordisco.cloneNode();
    mordisco.play();
  }
});
