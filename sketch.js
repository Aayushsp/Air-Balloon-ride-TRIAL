var balloon;
var backgroundImg, balloonA;
var database;

function preload(){
  backgroundImg = loadImage("Images/Background.png");

  balloonA = loadAnimation("Images/Hot Air Ballon-02.png", "Images/Hot Air Ballon-03.png", "Images/Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(800,800);
  balloon =createSprite(400, 200, 50, 50);
  balloon.scale = 0.5;
  balloon.addAnimation("Animation", balloonA);

  database = firebase.database();
  var balloonP = database.ref("Balloon/Position");
  balloonP.on("value", function readHeight(data){
    balloonP = data.val();
    balloon.x = height.x;
    balloon.y = height.y;
  })
}

function draw() {
  background(backgroundImg); 
  
  if(keyDown(UP_ARROW)){
    writePosition(0, -6);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0, 6);
  }

  else if(keyDown(RIGHT_ARROW)){
    writePosition(6, 0);
  }

  else if(keyDown(LEFT_ARROW)){
    writePosition(-6, 0);
  }



  drawSprites();
}
function writePosition(x, y){
    database.ref("Balloon/Position").set({
      'x' : height.x + x,
      'y' : height.y + y
    })
}