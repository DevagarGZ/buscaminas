function crearCasillas() {
  const tablero = document.querySelector("#tablero");
  for (let i = 0; i < 100; i++) {
    const nuevaCasilla = document.createElement("div");
    nuevaCasilla.classList.add("casilla");
    nuevaCasilla.id = `casilla${i}`;
    tablero.appendChild(nuevaCasilla);
  }
  engadirMinas();
}
function engadirMinas() {
  const minas = 10;
  for (let i = 0; i < minas; i++) {
    let numeroaleatorio = Math.floor(Math.random() * 100);
    const casillaescollida = document.querySelector(
      `#casilla${numeroaleatorio}`
    );
    casillaescollida.classList.add("mina");
    casillaescollida.innerHTML =
      '<svg  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-bomb"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.349 5.349l3.301 3.301a1.2 1.2 0 0 1 0 1.698l-.972 .972a7.5 7.5 0 1 1 -5 -5l.972 -.972a1.2 1.2 0 0 1 1.698 0z" /><path d="M17 7l1.293 -1.293a2.414 2.414 0 0 0 .707 -1.707a1 1 0 0 1 1 -1h1" /><path d="M7 13a3 3 0 0 1 3 -3" /></svg>';
  }
  comprobarCercania();
}
function comprobarCercania() {
  const casillas = 100;
  const superior = -10;
  const inferior = 10;
  const esquerda = -1;
  const dereita = 1;
  const diagonalsuperiordereita = superior + dereita;
  const diagonalsuperioresquerda = superior + esquerda;
  const diagonalinferiordereita = inferior + dereita;
  const diagonalinferioresquerda = inferior + esquerda;
  for (let i = 0; i < casillas; i++) {
    let idcasilla = `casilla${i}`;
    let numerominas = 0;
    let casillaacomprobar = document.getElementById(idcasilla);
    let ultimodigito = idcasilla[idcasilla.length - 1];

    if (casillaacomprobar.classList.contains("mina")) {
      //es una mina, no se hace nada.
    } else {
      arriba = document.getElementById(`casilla${i - superior}`);
      abaixo = document.getElementById(`casilla${i - inferior}`);
      ladoe = document.getElementById(`casilla${i - esquerda}`);
      ladod = document.getElementById(`casilla${i - dereita}`);
      diagonalsd = document.getElementById(
        `casilla${i - diagonalsuperiordereita}`
      );
      diagonalse = document.getElementById(
        `casilla${i - diagonalsuperioresquerda}`
      );
      diagonalid = document.getElementById(
        `casilla${i - diagonalinferiordereita}`
      );
      diagonalie = document.getElementById(
        `casilla${i - diagonalinferioresquerda}`
      );
      if (arriba && arriba.classList.contains("mina")) {
        numerominas++;
      }
      if (abaixo && abaixo.classList.contains("mina")) {
        numerominas++;
      }
      if (ladoe && ultimodigito < 9 && ladoe.classList.contains("mina")) {
        numerominas++;
      }
      if (ladod && ultimodigito > 0 && ladod.classList.contains("mina")) {
        numerominas++;
      }
      if (
        diagonalsd &&
        ultimodigito > 0 &&
        diagonalsd.classList.contains("mina")
      ) {
        numerominas++;
      }
      if (
        diagonalse &&
        ultimodigito < 9 &&
        diagonalse.classList.contains("mina")
      ) {
        numerominas++;
      }
      if (
        diagonalid &&
        ultimodigito > 0 &&
        diagonalid.classList.contains("mina")
      ) {
        numerominas++;
      }
      if (
        diagonalie &&
        ultimodigito < 9 &&
        diagonalie.classList.contains("mina")
      ) {
        numerominas++;
      }
      casillaacomprobar.innerHTML = numerominas;
      casillaacomprobar.classList.add(`cantidad${numerominas}`);
    }
  }
  facerpulsables();
}

function fixoClick() {
  const contido = this.classList.contains("mina");
  if (contido == true) {
    //exploto una mina
    const main = document.getElementById("buscaminas");
    const ganaches = document.querySelector(".avisos .ganaches");
    const perdiches = document.querySelector(".avisos .perdiches");
    ganaches.classList.add("oculto");
    perdiches.classList.remove("oculto");
    main.classList.add("mostraraviso");
    this.classList.add("explotada");
    detenerCronometro();
  } else {
    //hizo click en una casilla sin mina
    this.classList.add("comprobada");
    const superior = -10;
    const inferior = 10;
    const esquerda = -1;
    const dereita = 1;
    const diagonalsuperiordereita = superior + dereita;
    const diagonalsuperioresquerda = superior + esquerda;
    const diagonalinferiordereita = inferior + dereita;
    const diagonalinferioresquerda = inferior + esquerda;

    const casillactual = this.id.replace(/[a-zA-Z]+/g, "");
    let comparriba = false;
    let comabaixo = false;
    let comesquerda = false;
    let comdereita = false;
    let comdsd = false;
    let comdse = false;
    let comdid = false;
    let comdie = false;

    let casillainicial = casillactual;

    while (comparriba == false) {
      const arriba = document.getElementById(
        `casilla${casillainicial - superior}`
      );
      if (!arriba || arriba.classList.contains("mina")) {
        casillainicial = casillactual;
        comparriba = true;
      } else {
        arriba.classList.add("comprobada");
        casillainicial = casillainicial - superior;
      }
    }
    while (comabaixo == false) {
      const abaixo = document.getElementById(
        `casilla${casillainicial - inferior}`
      );
      if (!abaixo || abaixo.classList.contains("mina")) {
        casillainicial = casillactual;
        comabaixo = true;
      } else {
        abaixo.classList.add("comprobada");
        casillainicial = casillainicial - inferior;
      }
    }
    while (comesquerda == false) {
      const ladoesquerdo = document.getElementById(
        `casilla${casillainicial - esquerda}`
      );
      if (!ladoesquerdo || ladoesquerdo.classList.contains("mina")) {
        casillainicial = casillactual;
        comesquerda = true;
      } else {
        ladoesquerdo.classList.add("comprobada");
        casillainicial = casillainicial - esquerda;
      }
    }
    while (comdereita == false) {
      const ladodereiro = document.getElementById(
        `casilla${casillainicial - dereita}`
      );
      if (!ladodereiro || ladodereiro.classList.contains("mina")) {
        casillainicial = casillactual;
        comdereita = true;
      } else {
        ladodereiro.classList.add("comprobada");
        casillainicial = casillainicial - dereita;
      }
    }
    while (comdsd == false) {
      const dsd = document.getElementById(
        `casilla${casillainicial - diagonalsuperiordereita}`
      );
      if (!dsd || dsd.classList.contains("mina")) {
        casillainicial = casillactual;
        comdsd = true;
      } else {
        dsd.classList.add("comprobada");
        casillainicial = casillainicial - diagonalsuperiordereita;
      }
    }
    while (comdse == false) {
      const dse = document.getElementById(
        `casilla${casillainicial - diagonalsuperioresquerda}`
      );
      if (!dse || dse.classList.contains("mina")) {
        casillainicial = casillactual;
        comdse = true;
      } else {
        dse.classList.add("comprobada");
        casillainicial = casillainicial - diagonalsuperioresquerda;
      }
    }
    while (comdid == false) {
      const did = document.getElementById(
        `casilla${casillainicial - diagonalinferiordereita}`
      );
      if (!did || did.classList.contains("mina")) {
        casillainicial = casillactual;
        comdid = true;
      } else {
        did.classList.add("comprobada");
        casillainicial = casillainicial - diagonalinferiordereita;
      }
    }
    while (comdie == false) {
      const die = document.getElementById(
        `casilla${casillainicial - diagonalinferioresquerda}`
      );
      if (!die || die.classList.contains("mina")) {
        casillainicial = casillactual;
        comdie = true;
      } else {
        die.classList.add("comprobada");
        casillainicial = casillainicial - diagonalinferioresquerda;
      }
    }
  }
  //comprobar si descubrio todas las casillas
  let comprobadas = document.getElementsByClassName("comprobada");
  console.log(comprobadas.length);
  if (comprobadas.length > 89) {
    const main = document.getElementById("buscaminas");
    const perdiches = document.querySelector(".avisos .perdiches");
    const ganaches = document.querySelector(".avisos .ganaches");
    perdiches.classList.add("oculto");
    ganaches.classList.remove("oculto");
    main.classList.add("mostraraviso");
    detenerCronometro();
  }
}

//botones del juego
const reintentar = document.getElementsByClassName("reintentar");
const buscaminas = document.getElementById("buscaminas");
for (var i = 0; i < reintentar.length; i++) {
  reintentar[i].addEventListener("click", function () {
    const casillas = document.querySelectorAll(".casilla");
    casillas.forEach(function (casilla) {
      casilla.remove();
    });
    crearCasillas();
    reiniciarCronometro();
    iniciarCronometro();
    buscaminas.classList.remove("mostraraviso");
  });
}

function facerpulsables() {
  //detectar cando se fai click
  const cadros = document.querySelectorAll(".casilla");
  cadros.forEach(function (cadro) {
    cadro.addEventListener("click", fixoClick);
  });
}

//cronometro
let cronometro;
let tiempo = 0;
let iniciado = false;

function iniciarCronometro() {
  if (!iniciado) {
    iniciado = true;
    cronometro = setInterval(actualizarCronometro, 1000);
  }
}

function detenerCronometro() {
  clearInterval(cronometro);
  iniciado = false;
}

function reiniciarCronometro() {
  detenerCronometro();
  tiempo = 0;
  actualizarCronometro();
}

function actualizarCronometro() {
  tiempo++;
  const minutos = Math.floor((tiempo % 3600) / 60);
  const segundos = tiempo % 60;
  document.getElementById("cronometro").innerText = `${formatoTiempo(
    minutos
  )}:${formatoTiempo(segundos)}`;
}

function formatoTiempo(tiempo) {
  return tiempo < 10 ? "0" + tiempo : tiempo;
}

//iniciadores
crearCasillas();
iniciarCronometro();