// game.js

class Dino {
    constructor(groundY) {
      this.r = 50;
      this.x = 50;
      this.groundY = groundY;
      this.y = groundY - this.r;
      this.vy = 0;
      this.gravity = 2;
    }
    
    jump() {
      // Permite saltar solo si está en el suelo
      if (this.y === this.groundY - this.r) {
        this.vy = -25;
      }
    }
    
    update() {
      this.y += this.vy;
      this.vy += this.gravity;
      
      // Evita que el dino caiga por debajo del suelo
      if (this.y > this.groundY - this.r) {
        this.y = this.groundY - this.r;
        this.vy = 0;
      }
    }
    
    show() {
      fill(50);
      rect(this.x, this.y, this.r, this.r);
    }
  }
  
  class Obstacle {
    constructor(groundY) {
      this.w = 20;
      this.h = random(40, 80);
      this.x = width;
      this.groundY = groundY;
      this.y = groundY - this.h;
      this.speed = 6;
    }
    
    update() {
      this.x -= this.speed;
    }
    
    offscreen() {
      return this.x < -this.w;
    }
    
    show() {
      fill(255, 0, 0);
      rect(this.x, this.y, this.w, this.h);
    }
    
    hits(dino) {
      // Detección simple de colisiones entre rectángulos
      return (dino.x < this.x + this.w &&
              dino.x + dino.r > this.x &&
              dino.y < this.y + this.h &&
              dino.y + dino.r > this.y);
    }
  }
  