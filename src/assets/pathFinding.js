var ch;
var target;
var count;
var myList = [];
const side = 32;
const width = side*20;
const height = side*15;
var pathC;
var pfC;
var root;

function setup() {
  var c = 0;
  for(var j=side/2;j<height;j+=side)
  for(var i=side/2;i<width;i+=side){
    myList.push(new Tile(i,j,c));
    c++;
  }
  createCanvas(640, 480);
  pathC = new Path();
  pfC = new PathFind(pathC);
  pfC.initializeNodes();
  ch = new Steering(myList[pfC.sta].x,myList[pfC.sta].y);
  root = new DecisionTarget();
  target = createVector(20,20);
  count = 0;
}

function draw() {
  background(255);
  pathC.render();

  ch.update();
  ch.render();
  if(frameCount % 2 == 0){
    root.makeDecision();
  }
  pfC.renderNodes();
  count++;
}

function mousePressed() {
  var ended = parseInt(floor(mouseY/side))*20 + parseInt(floor(mouseX/side));
  if(!myList[ended].isWall && !myList[ended].isBlocked){
    goTo(ended);
  }
}

function DecisionTarget(){
  this.trueNode = new TrueTargetAction();
  this.falseNode = new FalseTargetAction();
}

function goTo (here){
  pfC.clearStartNode(pfC.sta);
  pfC.clearEndNode(pfC.end);
  pathC.points = [];
  pfC.end = here;
  for(var i=0;i<myList.length;i++){
      pfC.clearPathNodes(i);
  }
  //sta = endNode.id;
  pfC.sta = parseInt(floor(ch.location.y/side))*20 + parseInt(floor(ch.location.x/side));
  pfC.walked = 0;
  //updateNodes();
  pfC.setStartNode();
  pfC.setEndNode();
  pfC.timeP();
}

DecisionTarget.prototype.getBranch = function(){
  if(myList[parseInt(floor(ch.location.y/side))*20 + parseInt(floor(ch.location.x/side))].isEnd)
    return this.trueNode;
  else
    return this.falseNode;
}

DecisionTarget.prototype.makeDecision = function(){
  return this.getBranch().makeDecision();
}

function TrueTargetAction(){

}

TrueTargetAction.prototype.makeDecision = function(){
  var here = parseInt(random(0,299));
  if(!myList[here].isWall && !myList[here].isBlocked && !myList[here].isEnd){
    goTo(here, pfC);
    return true;
  }
  else{
    //println("pick again");
    this.makeDecision();
    return false;
  }
}

function FalseTargetAction(){

}

FalseTargetAction.prototype.makeDecision = function(){
  ch.follow();
  return true;
}

function Steering(x,y){
  this.location = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.orientation = 0;
  this.maxspeed = 1.0;
  this.maxforce = 0.1;
  this.history = [];
}

Steering.prototype.follow = function() {
  var predict = this.velocity.copy();
  predict.normalize();
  predict.mult(16);
  var predictpos = p5.Vector.add(this.location, predict);
  var normal = null;
  var target = null;
  var worldRecord = 1000000;

  for (var i = 0; i < pathC.points.length-1; i++) {

    var a = pathC.points[i];
    var b = pathC.points[i+1];

    var normalPoint = this.getNormalPoint(predictpos, a, b);

    if (normalPoint.x < min(a.x,b.x) || normalPoint.x > max(a.x,b.x) || normalPoint.y < min(a.y,b.y) || normalPoint.y > max(a.y,b.y)) {
      normalPoint = b.copy();
      a = pathC.points[(i+1)%pathC.points.length];
      b = pathC.points[(i+2)%pathC.points.length];  // Path wraps around
    }

    var distance = p5.Vector.dist(predictpos, normalPoint);
    if (distance < worldRecord) {
      worldRecord = distance;
      normal = normalPoint;
      var dir = p5.Vector.sub(b, a);
      dir.normalize();
      dir.mult(8);
      target = normalPoint.copy();
      target.add(dir);
    }
  }

  // if (worldRecord > pathC.radius) {
    this.seek(target);
  // }

}

Steering.prototype.getNormalPoint = function( p,  a,  b) {
  var ap = p5.Vector.sub(p, a);
  var ab = p5.Vector.sub(b, a);
  ab.normalize();
  ab.mult(ap.dot(ab));
  return p5.Vector.add(a, ab);
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
    radius1 = 5 + 5 * sin( frameCount-- * 0.05 );
    radius2 = 5 + 5 * sin( frameCount-- * 0.05 );
    fill(135,206,250,70);
    ellipse( this.history[i].x, this.history[i].y, radius1, radius2 );
    fill(99,199,178,70);
    ellipse( mouseX, mouseY, radius2, radius1 );
  }
  this.orientation = atan2(this.velocity.y,this.velocity.x) + PI/2;
  push();
  translate(this.location.x,this.location.y);
  rotate(this.orientation);
  noStroke();
  fill(135,206,250);
  triangle(10, -2, 0, -18, -10, -2);
  noStroke();
  fill(135,206,250);
  ellipse(0, 0, 20, 20);
  pop();
}

function Tile(tx, ty, tid){
  this.id = tid;
  this.parentID = -1;
  this.x = tx;
  this.y = ty;
  this.r = 32;
  this.f = -1;
  this.g = 1000;
  this.h = -1;
  this.isStart = false;
  this.isEnd = false;
  this.isWall = false;
  this.isWalked = false;
  this.isChecked = false;
  this.isBlocked = false;
  this.isPath = false;
  this.inOpenList = false;
  this.inClosedList = false;
}

Tile.prototype.render = function(){
  noStroke();
  if(this.isStart==true) fill(0,150,0,100);
  else if(this.isEnd==true) fill(150,0,0,100);
  else if(this.isPath==true) noFill();
  else if(this.isWalked==true) {stroke(50);fill(80,150,200,10);}
  else if(this.isWall==true) fill(150);
  else if(this.isBlocked==true) fill(255,0,0);
  else noFill();
  rectMode(CENTER);
  rect(this.x,this.y,this.r,this.r);
}

Tile.prototype.calcHwithManhattan = function(n){
  this.f = parseInt(((abs(this.x-n.x) + abs(this.y-n.y))/r));
}

Tile.prototype.calcHwithEuclidean = function(n){
  this.h = parseInt(sqrt(sq((this.x-n.x))+sq((this.y-n.y))));
}

Tile.prototype.calcF = function(){
  this.f = this.g + this.h;
}

Tile.prototype.dikastra = function(){
  this.f = this.g;
}

function Path(){
  this.points = [];
  this.radius = 1;
}

Path.prototype.addPoint = function(x ,y){
  var point = createVector(x,y);
  this.points.push(point);
}

Path.prototype.render = function(x ,y){
  // stroke(175);
  // strokeWeight(this.radius);
  // noFill();
  // beginShape();
  // for(i in this.points){
  //   vertex(this.points[i].x, this.points[i].y);
  // }
  // // this.points.foreach (function(point){
  // //   vertex(point.x, point.y);
  // // });
  // endShape();
  // Draw thin line for center of path
  stroke(0);
  strokeWeight(1);
  noFill();
  beginShape();
  for(i in this.points){
    vertex(this.points[i].x, this.points[i].y);
  }
  endShape();
}

Path.prototype.reverses = function(){
  var j = 0;
  var pointsC = this.points.slice(0);
  for(var i = this.points.length-1; i >= 0; i--){
    this.points.splice(j,0,pointsC.splice(i,1)[0]);
    this.points.splice(this.points.length-1,1);
    j++;
  }
}

function PathFind(path){
  this.sta = -1;
  this.end = -1;
  this.walked;
  this.path = path;
  this.endNode;
}

PathFind.prototype.clearPathNodes = function(i){
  myList[i].isPath = false;
  myList[i].isWalked = false;
  myList[i].inOpenList = false;
  myList[i].g = 1000;
  myList[i].isChecked = false;
  myList[i].inClosedList = false;
  myList[i].parentID=-1;
}
PathFind.prototype.clearStartNode = function(i){
  myList[i].g = 1000;
  myList[i].isPath = false;
  myList[i].isStart = false;
  myList[i].inOpenList = false;
  myList[i].isWalked = false;
}

PathFind.prototype.clearEndNode = function(i){
  myList[i].isEnd = false;
  myList[i].isPath = false;
  myList[i].isWalked = false;
  myList[i].inOpenList = false;
  myList[i].g = 1000;
  myList[i].isChecked = false;
  myList[i].inClosedList = false;
  myList[i].parentID=-1;
}

PathFind.prototype.renderNodes = function(){
  for(var i=0;i<myList.length;i++)
    myList[i].render();
}

PathFind.prototype.initializeNodes = function(){
  this.setWall();
  this.sta = parseInt(random(0,myList.length-1));
  this.setStartNode();
  this.end = this.sta;
  while(this.sta == this.end)
    this.end = parseInt(random(0,myList.length-1));
  this.setEndNode();
  this.timeP();
}

PathFind.prototype.setWall = function(){

  var t= [21,22,23,24,25,43,63,83,103];
  var a= [66,86,106,87,47,68,88,108];
  var k= [30,50,70,90,110,71,52,92,33,113];
  var o= [38,37,36,35,55,75,95,115,116,117,118,98,78,58,38];
  var h= [163,183,203,223,243,204,205,166,186,206,226,246];
  var w= [168,188,208,209,229,249,230,210,190,211,231,251,212,192,172];
  var three= [194,175,176,197,216,237,234,255,256];
  var room = [57,77,97,56,76,96,67];
  for( var each in room){
    myList[room[each]].isBlocked = true;
    myList[room[each]].inClosedList = true;
  }
  for(var each in t){
    myList[t[each]].isWall = true;
    myList[t[each]].inClosedList = true;
  }
  for(var each in a){
    myList[a[each]].isWall = true;
    myList[a[each]].inClosedList = true;
  }
  for(var each in k){
    myList[k[each]].isWall = true;
    myList[k[each]].inClosedList = true;
  }
  for(var each in o){
    myList[o[each]].isWall = true;
    myList[o[each]].inClosedList = true;
  }
  for(var each in h){
    myList[h[each]].isWall = true;
    myList[h[each]].inClosedList = true;
  }
  for(var each in w){
    myList[w[each]].isWall = true;
    myList[w[each]].inClosedList = true;
  }
  for(var each in three){
    myList[three[each]].isWall = true;
    myList[three[each]].inClosedList = true;
  }
}

PathFind.prototype.setEndNode = function(){

  if(myList[this.end].isWall==false && myList[this.end].isStart == false && !myList[this.end].isBlocked){
      myList[this.end].isEnd = true;
      this.endNode = myList[this.end];
    }
    else{
      this.end = parseInt(random(0,myList.length-1));
      this.setEndNode();
    }
}

PathFind.prototype.setStartNode = function(){

  if(myList[this.sta].isWall==false && myList[this.sta].isEnd==false){
    myList[this.sta].g = 0;
    myList[this.sta].calcF();
    myList[this.sta].isStart = true;
    myList[this.sta].inOpenList = true;
  }
  else{
    this.sta = parseInt(random(0,myList.length-1));
    this.setStartNode();
  }
}

PathFind.prototype.timeP = function(){

  for(var i=0;i<myList.length;i++){
    if(myList[i].isWall) continue;
    if(myList[i].isBlocked) continue;
    else{
      myList[i].calcHwithEuclidean(this.endNode);
    }
  }
  if(this.isBlocked()==false) this.findPath();
}

PathFind.prototype.isWallBothering = function( s, e){

  for(var i=0;i<myList.length;i++){
    var n = myList[i];
    var r1 = dist(s.x,s.y,n.x,n.y);
    var r2 = dist(e.x,e.y,n.x,n.y);
    if(r1==side && r2==side && n.isWall==true) return true;
  }
  return false;
}

PathFind.prototype.findPath = function(){

  var reachedTarget = false;
  while((reachedTarget == false) && this.isBlocked()==false){
    var small = this.smallestF_Index(myList);
    myList[small].isWalked     = true;
    myList[small].inOpenList   = false;
    myList[small].inClosedList = true;
    var n = myList[small];
    for(var i=0;i<myList.length;i++){
      var dis = dist(n.x,n.y,myList[i].x,myList[i].y);//api ref?
      if(myList[i].isWall) continue;
      if(myList[i].isBlocked) continue;
      if(myList[i].inClosedList) continue;
      if(dis<side*1.5){
        if(dis>side && this.isWallBothering(n,myList[i])) continue;
        myList[i].inOpenList = true;
        myList[i].isChecked  = true;
        myList[i].render();
        var tempG;
        if(dis>side) tempG = n.g + 45;
        else tempG = n.g + 32;
        if(tempG < myList[i].g){
          myList[i].g = tempG;
          myList[i].parentID = n.id;
        }
        myList[i].calcF();
        if(myList[i].isEnd==true){
          reachedTarget=true;
          break;
        }
      }
    }
  }
  var k = 0;
  for(var i=0;i<myList.length;i++)
  if(myList[i].isEnd==true)   k = i;
  while(true){
    var temp = myList[k];
    this.path.addPoint(temp.x,temp.y);
    temp.isPath = true;
    k = myList[k].parentID;
    if(k == -1) break;
  }
  this.path.reverses();
}

PathFind.prototype.isBlocked = function(){
  var blocked = true;
  for(var i=0;i<myList.length;i++)
  if(myList[i].inOpenList==true) blocked = false;
  return blocked;
}

PathFind.prototype.smallestF_Index = function(){
  var openListID = [];
  for(var i=0;i<myList.length;i++)
  if(myList[i].inOpenList) openListID.push(myList[i].id);

  var smallestFID = openListID[openListID.length-1];
  for(var i=0;i<openListID.length;i++){
    var nID = openListID[i];
    myList[nID].calcF();
    if(myList[nID].f < myList[smallestFID].f) smallestFID = nID;
  }
  return smallestFID;
}
