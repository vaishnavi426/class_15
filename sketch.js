var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImg, tree;
var t1, t2, t3, t4, t5, t6, ran, score=0;
var tree_grp, cloud_grp;
var gamestate = "play";
var restart, restart_img;
var gameOver, over_img;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImg = loadImage("cloud.png");
  
  t1 = loadImage("obstacle1.png");
  t2 = loadImage("obstacle2.png");
  t3 = loadImage("obstacle3.png");
  t4 = loadImage("obstacle4.png");
  t5 = loadImage("obstacle5.png");
  t6 = loadImage("obstacle6.png");

  restart_img = loadImage("restart.png");
  over_img = loadImage("gameOver.png");
}

function setup() {

  createCanvas(600,200)

  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  var ran = Math.round(random(20,200));
  console.log(ran);

  tree_grp = new Group();
  cloud_grp = new Group();

  restart = createSprite(300,100,20,20);
  restart.addImage("restart",restart_img);
  restart.scale = 0.3;

  gameOver = createSprite(300,80,20,20);
  gameOver.addImage("over",over_img);
  gameOver.scale = 1.5;

}

function draw() {
  //set background color
  background("white");
  text("Score = "+score,500,40);
  if(gamestate == "play") {
    score = score+Math.round(frameCount/100);
    // jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    restart.visible = false;
    gameOver.visible = false;

    makeObstacles();
    makeClouds();

    if(tree_grp.isTouching(trex)) {
      gamestate = "end";
    }

  }
  else if(gamestate == "end") {
    ground.velocityX = 0;
    tree_grp.setVelocityXEach(0);
    cloud_grp.setVelocityXEach(0);
    tree_grp.setLifetimeEach(-1);
    cloud_grp.setLifetimeEach(-1);
    //trex.changeAnimation("collided",trex_collided);
    trex.velocityY = 0;
    restart.visible = true;
    gameOver.visible = true;
    trex.changeAnimation("collided", trex_collided);
  }

  trex.setCollider("circle",0,0,40);
  trex.debug = false;

  //stop trex from falling down
  trex.collide(invisibleGround);

  drawSprites();
  
}

function makeClouds() {
  if(frameCount%80==0 || frameCount == 10) {
    cloud = createSprite(600,50,20,20);
    cloud.velocityX=-3;
    cloud.y = Math.round(random(50,100));
    cloud.addImage("clouds",cloudImg);
    cloud.scale = random(0.4,0.8);
    trex.depth = cloud.depth+1;
    console.log(trex.depth," , ",cloud.depth);
    cloud.lifetime = -200;
    cloud_grp.add(cloud);
  }
}

function makeObstacles() {
  if(frameCount%60==0) {
    tree = createSprite(600,165,20,20);
    tree.velocityX= -4;
    ran= Math.round(random(1,6));
    switch(ran) {
      case 1: tree.addImage(t1);
      break;
      case 2: tree.addImage(t2);
      break;
      case 3: tree.addImage(t3);
      break;
      case 4: tree.addImage(t4);
      break;
      case 5: tree.addImage(t5);
      break;
      case 6: tree.addImage(t6);
      break;
    }
    tree.scale = 0.5;
    tree.lifetime = -170;
    tree_grp.add(tree);
  }
}


