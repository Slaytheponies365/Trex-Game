
var trex ,trex_running;
var groundimage,ground
var invisibleground;
var cloud,cloudimage;
var ob1
var ob2
var ob3
var ob4
var ob5
var ob6
var obstacles
var gamestate="play"
var cactusG
var cloudsG
var trex_collided
var gameOver
var restart
var GAMEOVER
var button
var score = 0
var checkPoint
var die
var jump
function preload(){
  trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png")
groundimage= loadImage("ground2.png")
  cloudimage = loadImage ("cloud.png")
  ob1 = loadImage ("obstacle1.png")
  ob2 = loadImage ("obstacle2.png")
  ob3 = loadImage ("obstacle3.png")
  ob4 = loadImage ("obstacle4.png")
  ob5 = loadImage ("obstacle5.png")
  ob6 = loadImage ("obstacle6.png")
  trex_collided = loadAnimation ("trex_collided.png")
  gameOver = loadImage ("gameOver.png")
  restart = loadImage ("restart.png")
  checkPoint = loadSound ("checkPoint.mp3")
  die = loadSound ("die.mp3")
  jump = loadSound ("jump.mp3")
}

function setup(){
  createCanvas(600,200)
  trex = createSprite(30,150,10,10)
  trex.addAnimation ("trexImages",trex_running)
  trex.addAnimation ("trex_collided",trex_collided)
  trex.scale = 0.5 
ground = createSprite(300,180,600,10)
  ground.addImage(groundimage)
  invisibleground = createSprite(300,185,600,5)
  invisibleground.visible = false
cloudsG=createGroup()
cactusG=createGroup()
  trex.setCollider ("circle",0,0,45)
  trex.debug = false
  GAMEOVER = createSprite (300,100,20,20)
  GAMEOVER.addImage (gameOver)
  GAMEOVER.scale= 0.5
  button = createSprite (300,120,20,20)
  button.addImage (restart)
  button.scale = 0.3
}


function draw(){
  background("white")
  text("score: "+score, 530, 20);
  if (score %200==0) {
  checkPoint.play();
}

  if (gamestate=="play"){
    button.visible = false
    GAMEOVER.visible = false 
    trex.changeAnimation ("trexImages",trex_running)
  ground.velocityX = -5
  if(keyDown("space")&&trex.y>100) {
trex.velocityY= -12
    jump.play();
  }
    trex.velocityY=trex.velocityY +1
trex.collide(invisibleground)
  
  if(ground.x<0){
    ground.x = 300
  }
    populateclouds();
  populateObstacles();
    if(trex.isTouching(cactusG)){
      gamestate="end"
      die.play();
    }
    score = score+1
  }
  if (gamestate=="end"){
    trex.changeAnimation ("trex_collided",trex_collided)
    trex.velocityY=trex.velocityY +1
trex.collide(invisibleground)
      ground.velocityX=0
    cactusG.setVelocityXEach(0);
    cloudsG.setVelocityXEach(0);
    button.visible = true
    GAMEOVER.visible = true
    if (mousePressedOver(button)){
      reset()
    }
  
  }
  
  
  
 
  drawSprites()
}
function populateclouds()
{
  if(frameCount%60==0)
{
  cloud = createSprite (550,20,20,20)
  cloud.addImage(cloudimage)
  cloud.velocityX = -5
cloud.y=Math.round(random(30,70))
  cloudsG.add(cloud)
  
}

}
function populateObstacles()

{
  if(frameCount%50==0){
    obstacles = createSprite (550,170,20,20)
  obstacles.velocityX = -5
  var A =Math.round(random(1,6))
  switch(A)
    {
      case 1:obstacles.addImage(ob1)
        break
        case 2:obstacles.addImage(ob2)
        break
        case 3:obstacles.addImage(ob3)
        break
        case 4:obstacles.addImage(ob4)
        break
        case 5:obstacles.addImage(ob5)
        break
        case 6:obstacles.addImage(ob6)
        break   
    }
        cactusG.add(obstacles)
        obstacles.scale=0.5
      
  }

}
  function reset()
  
  {
    gamestate = "play"
    cloudsG.destroyEach();
    cactusG.destroyEach();
    score = 0
  }