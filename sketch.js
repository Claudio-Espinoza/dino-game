// sketch.js

let dino;
let obstacles = [];
let groundY = 300;
let cont = 0;

let video;
let classifier;
let modelLoaded = 'https://teachablemachine.withgoogle.com/models/ARudLa_JM/';
let label = 'esperando...';

// Constantes
let UP = 'saltar'
let NULL = 'nada'


function preload(){
  classifier = ml5.imageClassifier(modelLoaded);
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  console.log(results);
  console.log(results[0].label);

  label = results[0].label; 
  if (label !== results[0].label) {
    console.logu("Mostrar cambios")
    label = results[0].label;  
    keyPressed();  
  }
}


function setup() {
  video = createCapture(VIDEO);
  video.hide();

  createCanvas(800, 400);
  // Se crea el dino pasándole la posición del suelo
  dino = new Dino(groundY);
  // Se agrega el primer obstáculo
  obstacles.push(new Obstacle(groundY));

  setInterval(classifyVideo, 500);
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
      console.log("Game Over");
      console.log("Puntaje: " + cont)
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
  if (key === ' ' || keyCode === UP_ARROW) {
    cont = cont+1
    dino.jump();
  }
}
