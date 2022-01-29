var ch;
var target;
var count;

function setup() {
  createCanvas(640, 480);
  ch = new Steering(20,height -20);
  target = createVector(20,20);
  count = 0;
}

function draw() {
  background(255);
  ch.render();
  ch.arrive(target);
  ch.update();
  count++;
}

function mousePressed() {
  target.set(mouseX,mouseY);
}

function Steering(x,y){
  this.location = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.orientation = 0;
  this.maxspeed = 2.9;
  this.maxforce = 0.1;
  this.history = [];
}

Steering.prototype.arrive = function(target) {
    desired = p5.Vector.sub(target,this.location);

    var d = desired.mag();
    desired.normalize();
    if (d < 300) {
      var m = map(d,0,100,0,this.maxspeed);
      desired.mult(m);
    } else {
      desired.mult(this.maxspeed);
    }

    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

// Forces go into acceleration
Steering.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

Steering.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxspeed);
  this.location.add(this.velocity);
  this.acceleration.mult(0);
  if((count%10)==0 && this.velocity.mag() != 0){
    this.history.unshift(this.location.copy());
  }
  if (this.history.length > 10) {
    this.history.pop();
  }
}

// Draw boid as a circle
Steering.prototype.render = function() {
  noStroke();
    fill(135,206,250,30);
    for (var i = 0; i < this.history.length; i++) {
      radius1 = 10 + 5 * sin( frameCount-- * 0.05 );
      radius2 = 10 + 5 * sin( frameCount-- * 0.05 );
      fill(135,206,250,30);
      ellipse( this.history[i].x, this.history[i].y, radius1, radius2 );
      fill(99,199,178,30);
      ellipse( mouseX, mouseY, radius2, radius1 );
    }
    this.orientation = atan2(this.velocity.y,this.velocity.x) + PI/2;
    push();
    translate(this.location.x,this.location.y);
    rotate(this.orientation);
    noStroke();
    fill(135,206,250);
    triangle(20, 15, 0, -40, -20, 15);
    noStroke();
    fill(135,206,250);
    ellipse(0, 20, 40, 40);
    pop();
}
