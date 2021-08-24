let warp = [];
let swarm = [];
let num = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  num = height*0.001;
  frameRate(15);
  for (let i = 0; i < height*0.05; i++){
    swarm.push(new Spiral());
  }
  
}

function draw() {
  background(10, 10);
  for (let i = 0; i < swarm.length; i++) {
    swarm[i].run();
  }
  
  for (let i = 0; i < num; i++){
    warp.push(new TimeCone());
  }
  push();
  translate(width/2, height/2);
  scale(0.5)
  for(let i = warp.length - 1; i >= 0; i--){
    let t = warp[i];
    let a = atan2(mouseY - height / 2, mouseX - width / 2);
  rotate(a);
    t.run();
    if (t.ghost()){
      warp.splice(i, 1);
    }
  }
  pop();
  
}

class TimeCone{
  constructor(){
    this.loc = createVector(mouseX, mouseY);
    this.vel = createVector(0, 0);
    this.col = random(200,300);
    this.ts = random(2);
    this.spin = 0;
    this.a = createVector(random(-0.1,0.1), random(-0.1,0.1));
    this.lifespan = 255.0;
  }
  
  run(){
    this.update();
    this.display();
  }
  
  update(){
    this.vel.add(this.a);
    this.vel.limit(this.ts);
    this.loc.add(this.vel);
    this.spin += random(0.1)
    this.lifespan -= random(1,3);
  }
  display(){
    fill(this.col, random(100), random(100), 70);
    beginShape();
    vertex(this.loc.x, this.loc.y);
    vertex(this.loc.x + 50, this.loc.y);
    vertex(this.loc.x + 25, this.loc.y + 50);
    vertex(this.loc.x + 50, this.loc.y + 100);
    vertex(this.loc.x, this.loc.y + 100);
    vertex(this.loc.x + 25, this.loc.y + 50);
    vertex(this.loc.x, this.loc.y);
    endShape(CLOSE);
  }
  
  ghost(){
    if (this.lifespan < 0.0){
      return true;
    } else {
      return false;
    }
    }
}

class Spiral{
  constructor(){
    this.loc = createVector(width/2, height/2);
    this.vel = createVector(0, 0);
    this.ts = random(5);
    this.color = random(255);
    this.len = random(height*0.1);
    //this.a = p5.Vector.random2D();
  }
  
  run(){
    this.update();
    this.display();
    this.edge();
  }
  
  update(){
    this.a = p5.Vector.random2D();
    this.a.mult(random(2));
    this.vel.add(this.a);
    this.vel.limit(this.ts);
    this.loc.add(this.vel);
  }
  
  display(){
    for (let i = 0; i < 5; i++){
      noFill();
      stroke(this.color);
      circle(this.loc.x, this.loc.y, this.len*i);
    }
  }
  
  edge() {
    if (this.loc.x > width) {
      this.loc.x = 0;
    }
    if (this.loc.x < 0) {
      this.loc.x = width;
    }
    if (this.loc.y > height) {
      this.loc.y = 0;
    }
    if (this.loc.y < 0) {
      this.loc.y = height;
    }
  }
}