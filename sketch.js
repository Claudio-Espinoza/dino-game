// sketch.js

let dino;
let obstacles = [];
let groundY = 300;
let cont = 0;
let dinoImg; 
let three; 

let video;
let classifier;
let modelLoaded = 'https://teachablemachine.withgoogle.com/models/ARudLa_JM/';
let label = 'esperando...';

// Constantes
let UP = 'saltar'
let NULL = 'nada'


function preload() {
  classifier = ml5.imageClassifier(modelLoaded);
  dinoImg = loadImage('/resource/dino.png');
  three = loadImage('/resource/arbol.png')
}

function classifyVideo() {
  if (classifier) {
    classifier.classify(video, gotResults);
  } else {
    console.error("El clasificador no está inicializado.");
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  console.log(results);
  console.log(results[0].label);

  label = results[0].label; 
    console.log("Mostrar cambios")
    keyPressed();  
  
}


function setup() {
  video = createCapture(VIDEO);
  video.hide();

  setInterval(classifyVideo, 500);
  setTimeout(2000);

  createCanvas(800, 400);
  // Se crea el dino pasándole la posición del suelo
  dino = new Dino(groundY, dinoImg);
  // Se agrega el primer obstáculo
  obstacles.push(new Obstacle(groundY));
  



}

function draw() {


  background(220);

  textSize(30);
  textAlign(LEFT, TOP); 
  fill(0); 
  text("Puntaje: " + cont, 10, 10);

  // Actualizar y dibujar al dinosaurio
  dino.update();
  dino.show();

  // Cada 60 frames se crea un nuevo obstáculo
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle(groundY));
  }

  // Actualizar y dibujar cada obstáculo
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    // Si hay colisión, detener el juego
    if (obstacles[i].hits(dino)) {
      background(255, 0, 0);
      textSize(30);
      textAlign(CENTER, CENTER); 
      fill(0);
      text("Haz perdido\nTu puntaje es: " + cont, width / 2, height / 2);
      noLoop();
    }

    // Eliminar obstáculos que han salido de la pantalla
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }

  // Dibujar la línea del suelo
  stroke(0);
  line(0, groundY, width, groundY);
}

function keyPressed() {
  // Permite saltar con la tecla de espacio o la flecha arriba
  if (label === 'saltar' ) {
    cont = cont+1
    dino.jump();
  }
}
