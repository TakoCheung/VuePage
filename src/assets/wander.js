var ch;
var wander;
var count;
// var wandertheta;
var debug;

function setup() {
  createCanvas(640, 480);
  ch = new Steering(width/2,height/2);
  count = 0;
  debug = true;
  wander = true;
}

function draw() {
  background(255);
  if(debug){
    text('Click anywhere inside the window to turn off the visualization, and press any key to change different way to wander',10,10);
  }
  ch.render();
  ch.boundary(40);
  if(wander){
    ch.wander();
  }else{
    ch.wander2();
  }
  ch.update();
  count++;
}

function mousePressed() {
  debug = !debug;
}

function keyPressed() {
  wander = !wander;
}

function Steering(x,y){
  this.location = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.orientation = 0;
  this.maxspeed = 2.9;
  this.maxforce = 0.1;
  this.orientation = 0;
  this.history = [];
}

Steering.prototype.boundary = function(r){
    var desired;

    if (this.location.x < r) {
      desired = createVector(this.maxspeed, this.velocity.y);
    }
    else if (this.location.x > width -r) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.location.y < r) {
      desired = createVector(this.velocity.x, this.maxspeed);
    }
    else if (this.location.y > height-r) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired != undefined) {
      desired.normalize();
      desired.mult(this.maxspeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce*2);
      this.applyForce(steer);
    }

    if (debug) {
      stroke(0);
      noFill();
      line(r,r,width-r,r);
      line(width -r,r,width -r,height - r);
      line(width -r,height - r, r, height - r);
      line(r, height - r,r,r);
    }
  }

Steering.prototype.wander = function(){
  var wanderR = 25;
  var wanderD = 80;
  var change = 3.14;
  var wandertheta = random(-change,change);
  var circlepos = this.velocity.copy();
  circlepos.normalize();
  circlepos.mult(wanderD);
  circlepos.add(this.location);
  var h = this.velocity.heading();
  var circleOffSet = createVector(wanderR*cos(wandertheta+h),wanderR*sin(wandertheta+h));
  var target = p5.Vector.add(circlepos,circleOffSet);
  this.seek(target);
  if (debug) {
    stroke(0);
    noFill();
    ellipseMode(CENTER);
    ellipse(circlepos.x,circlepos.y,wanderR*2,wanderR*2);
    ellipse(target.x,target.y,4,4);
    line(this.location.x,this.location.y,circlepos.x,circlepos.y);
    line(circlepos.x,circlepos.y,target.x,target.y);
  }
}

Steering.prototype.wander2 = function(){
  var wanderR = 80;
  var change = 3.14;
  var wandertheta = random(-change,change);
  var circlepos = this.velocity.copy();
  circlepos.normalize();
  circlepos.add(this.location);
  var h = this.velocity.heading();
  var circleOffSet = createVector(wanderR*cos(wandertheta+h),wanderR*sin(wandertheta+h));
  var target = p5.Vector.add(circlepos,circleOffSet);
  this.seek(target);
  if (debug) {
    stroke(0);
    noFill();
    ellipseMode(CENTER);
    ellipse(circlepos.x,circlepos.y,wanderR*2,wanderR*2);
    ellipse(target.x,target.y,4,4);
    line(this.location.x,this.location.y,circlepos.x,circlepos.y);
    line(circlepos.x,circlepos.y,target.x,target.y);
  }
}

Steering.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.location); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
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
    ellipse( this.history[i].x, this.history[i].y, radius1, radius2 );
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
