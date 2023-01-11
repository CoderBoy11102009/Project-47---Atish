var bg,bgImg;
var player, shooterImgLeft, shooterImgRight, shooter_shooting_right, shooter_shooting_left;
var bullet, bulletImgRight, bulletImgLeft, bulletGroup;
var zombie, zombieImgRight, zombieImgLeft, zombieGroup;
var rightKeyActive= false;
var score= 0;
var lives= 3, life1, life2, life3, life;

function preload(){
  //creating the images for the shooter walking
  shooterImgRight = loadImage("assets/shooter_1_right.png");
  shooterImgLeft = loadImage("assets/shooter_1_left.png");

  //creating the images for the shooter to shoot
  shooter_shooting_right = loadImage("assets/shooter_3_right.png");
  shooter_shooting_left = loadImage("assets/shooter_3_left.png");

  //uploading the image for the background
  bgImg = loadImage("assets/bg.jpeg");

  //uploading the bullet image
  bulletImgRight = loadImage("assets/bullet1_right.png");
  bulletImgLeft = loadImage("assets/bullet1_left.png");

  //uploading the zombie image
  zombieImgRight = loadImage("assets/zombie_right.png");
  zombieImgLeft = loadImage("assets/zombie_left.png");

  //uplaoding the life image
  life1 = loadImage("assets/heart_1.png");
  life2 = loadImage("assets/heart_2.png");
  life3 = loadImage("assets/heart_3.png");
}

function setup() {
  //creating the canvas
    createCanvas(windowWidth,windowHeight);

  //adding the background image
   /* bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
    bg.addImage(bgImg);
    bg.scale = 1.1;
  */
  //creating the bullet group
    bulletGroup = new Group();

  //creating the zombie group
    zombieGroup = new Group();

  //creating the player sprite
    player = createSprite(displayWidth/2, displayHeight-300, 50, 50);
    player.addImage("right", shooterImgRight);
    player.addImage("left",shooterImgLeft);
    player.addImage("shootRight",shooter_shooting_right);
    player.addImage("shootLeft", shooter_shooting_left);
    player.changeImage("right");
    player.scale = 0.3;
    player.debug = true;
    player.setCollider("rectangle",0,0,300,300);

  //creating the lives
    life = createSprite(displayWidth/2, 50, 10, 10);
    life.addImage("3life", life3);
    life.addImage("2life", life2);
    life.addImage("1life", life1);
    life.changeImage("3life");
    life.scale= 0.3;
}

function draw() {
  //Creating the background colour (nothing)
  background(bgImg); 

  fill("white")
  textSize(40)
  text("Score: "+ score, displayWidth-200, 50)

  spawnZombies();
  shootBullet();
  
  if(zombieGroup.isTouching(bulletGroup)){
    bullet.destroy();
    zombie.destroy();
    score++
  }

  if(zombieGroup.isTouching(player)){
    lives=lives-1
    zombie.destroy();
  }

  if(lives === 2){
    life.changeImage("2life");
  }

  if(lives === 1){
    life.changeImage("1life");
  }


  playerControl();
  drawSprites();
}

function spawnZombies() {
  if(frameCount%150 === 0){
    var x= Math.round(random(50, displayWidth-50));
    var y= Math.round(random(displayHeight-500, displayHeight-180));
    zombie = createSprite(x, y, 100, 100);
    //zombie.debug=true
    
    if(x>50 && x<displayWidth/2){
      zombie.addImage("zombieRight", zombieImgRight);
      zombie.scale=0.2;
      zombie.velocityX=4;
    }

    if(x<displayWidth-50 && x>displayWidth/2) {
      zombie.addImage("zombieLeft", zombieImgLeft);
      zombie.scale=0.2;
      zombie.velocityX= -4;
    }
    
    zombie.setCollider("rectangle", 0, 0, 500, 850);
    zombieGroup.add(zombie);
    zombie.lifetime= 700;
    

  }
}

function shootBullet() {
    if(keyWentDown("space")){
      if(rightKeyActive){
        bullet = createSprite(player.x+50, player.y-25, 100, 100);
        bullet.scale = 0.1;
        bullet.addImage("bulletRight", bulletImgRight);
        bullet.velocityX = 5;
        //bullet.debug= true
        bullet.setCollider("rectangle", 0, 0, 300,300)
      }

      if(!rightKeyActive){
        bullet = createSprite(player.x-50, player.y-25, 100, 100);
        bullet.scale = 0.1;
        bullet.addImage("bulletLeft", bulletImgLeft);
        bullet.velocityX = -5;
        //bullet.debug= true
        bullet.setCollider("rectangle", 0, 0, 300,300)
      }

      bulletGroup.add(bullet);
      bullet.lifetime = 700
    }
  }



function playerControl(){
    //moving the player up and down and making the game mobile compatible using touches
    if((keyDown("UP_ARROW")||touches.length>0) && player.y>displayHeight-500){
      player.y = player.y-30
    }
  
    if((keyDown("DOWN_ARROW")||touches.length>0) && player.y<displayHeight-180){
    player.y = player.y+30
    }
    
    if((keyDown("RIGHT_ARROW")||touches.length>0) && player.x<displayWidth-100){
      rightKeyActive=true
      player.x = player.x+20
      player.changeImage("right")
    }
  
    if((keyDown("LEFT_ARROW")||touches.length>0) && player.x>90){
      rightKeyActive=false
      player.x = player.x-20
      player.changeImage("left")
    }

     //Shooting to the left side
     if(keyWentDown("space") && !rightKeyActive) {
      player.changeImage("shootLeft")
   }

    else if(keyWentUp("space") && !rightKeyActive) {
        player.changeImage("left")
    }

    //Shooting to the right side
    if(keyWentDown("space") && rightKeyActive){
        player.changeImage("shootRight");
    }

    else if(keyWentUp("space") && rightKeyActive){
        player.changeImage("right");
    }

}

function gameOver() {

}

