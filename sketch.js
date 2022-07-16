// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

// variáveis do oponente 
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentarBolinha();
  colisaoBorda();
  mostrarRaquete();
  movimentarRaquete();
  //colisaoBolinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostrarRaqueteOponente();
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto(); 
  bolinhaNaoFicaPresa();
  
}

function mostrarBolinha(){
circle(xBolinha, yBolinha, diametro);
}

function movimentarBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha
}

function colisaoBorda(){
  
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeyBolinha *= -1;
  }
}

function mostrarRaquete(){
  rect(xRaquete, yRaquete, comprimentoRaquete, alturaRaquete)
}

function movimentarRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function colisaoBolinhaRaquete(){
  
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadexBolinha *= -1;
      raquetada.play();
    }
}

function mostrarRaqueteOponente(){
  rect(xRaqueteOponente, yRaqueteOponente, comprimentoRaquete, alturaRaquete)
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color (30,144,255));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
     fill(color (30,144,255));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}


