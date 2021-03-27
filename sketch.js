var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var opponentImg1,opponentImg2,opponentImg3,opponentImg4;

var opponentImg1g,opponentImg3g;

var cycleBell;

var player1,player3;

var END =0;
var PLAY =1;
var gameState = PLAY;
 
var  gameOverImg;

var distance=0;
var gameOver, restart;


function preload(){
  pathImg = loadImage("images/Road.png");
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  opponentImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  opponentImg2 = loadAnimation("images/mainPlayer3.png");
  
  opponentImg3 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  opponentImg4 = loadAnimation("images/mainPlayer3.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  
  gameOverImg = loadImage("images/123.png");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.06;
  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
Player1= new Group();
Player3= new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
    
  distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
       
  edges= createEdgeSprites();
  mainCyclist.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    if(keyDown("space")) {
    cycleBell.play();
  }
     var select_opponentImg= Math.round(random(1,3));
    
    
  if (World.frameCount % 150 == 0) {
    if (select_opponentImg == 1) {
      opponentImg1g();
    } else if (select_opponentImg == 2) {
      opponentImg3g();
    } 
    }
       if(Player1.isTouching(mainCyclist)){
     gameState = END;
    opponentImg1.velocityY = 0;
    opponentImg1.addAnimation(" mainRacerImg2",opponentImg2);
    }
    
    if(Player3.isTouching(mainCyclist)){
      gameState = END;
      opponentImg3.velocityY = 0;
      opponentImg3.addAnimation(" mainRacerImg2",opponentImg4);
    }
    
  } else if (gameState === END) {
    gameOver.visible = true;
    
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
    
    path.velocityX = 0;
    
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    
   Player1.setVelocityXEach(0);
    Player1.setLifetimeEach(-1);
  
   Player3.setVelocityXEach(0);
    Player3.setLifetimeEach(-1);
    
     if(keyDown("UP_ARROW")) {
      reset();
    }
  }
}
  
function opponentImg1g(){
        opponentImg1 =createSprite(1100,Math.round(random(50, 250)));
        opponentImg1.scale =0.06;
        opponentImg1.velocityX = -(6 + 2*distance/150);
        opponentImg1.addAnimation("opponentImg1",mainRacerImg1);
        opponentImg1.setLifetime=170;
        Player1.add(opponentImg1);
}

function opponentImg3g(){
        opponentImg3 =createSprite(1100,Math.round(random(50, 250)));
        opponentImg3 .scale =0.06;
        opponentImg3 .velocityX = -(6 + 2*distance/150);
        opponentImg3.addAnimation("opponentImg3",mainRacerImg1);
        opponentImg3 .setLifetime=170;
        Player3.add(opponentImg3);
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  Player1.destroyEach();
 Player3.destroyEach();
  
  distance = 0;
}