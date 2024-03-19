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
    casillaescollida.innerHTML = "m";
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
      //console.log("es una mina");
      //non se fai nada
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
    }
  }
}

//activadores, despois poñer cun boton
crearCasillas();

//detectar cando se fai click
const cadros = document.querySelectorAll(".casilla");

function fixoClick() {
  const contido = this.textContent;
  if (contido == "m") {
    alert("perdiches");
    this.classList.add("comprobada");
  } else {
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

    let casillainicial = casillactual;

    while (comparriba == false) {
      const arriba = document.getElementById(`casilla${casillainicial - superior}`);
      if (!arriba || arriba.classList.contains("mina")) {
        casillainicial = casillactual;
        comparriba = true;
      } else {
        arriba.classList.add("comprobada");
        casillainicial = casillainicial - superior;
      }
    }
    while (comabaixo == false) {
      const abaixo = document.getElementById(`casilla${casillainicial - inferior}`);
      if (!abaixo || abaixo.classList.contains("mina")) {
        casillainicial = casillactual;
        comabaixo = true;
      } else {
        abaixo.classList.add("comprobada");
        casillainicial = casillainicial - inferior;
      }
    }
  }
}

cadros.forEach(function (cadro) {
  cadro.addEventListener("click", fixoClick);
});
