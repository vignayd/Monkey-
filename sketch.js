var monkey, rockGroup, bananaGroup,count=0;

    
var bananaImg, stoneImg, monkeyImg, bgImg,invisibleGround;
function preload(){
    monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
    bananaImg = loadImage("banana.png");
    stoneImg = loadImage("stone.png");
    bgImg = loadImage("jungle.jpg");

}

function setup(){
    createCanvas(600,300);
    
    bg = createSprite(300,0,600,300);
    bg.addImage(bgImg);
    bg.x = bg.width/2;
    bg.scale = 1.5;

    monkey = createSprite(50,200);
    monkey.addAnimation("monkey",monkeyImg);
    monkey.scale = 0.1;

    invisibleGround = createSprite(300,290,600,20);
    invisibleGround.visible =false;

    bananaGroup = new Group();
    rockGroup = new Group();
}


function draw(){
  background(0);
  
  monkey.collide(invisibleGround);
    
 
    bg.velocityX = -(6 + 3*count/100);
    //scoring
  
    
  
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
    
     
    if(keyDown("space")){
      monkey.velocityY = -12 ;
    }
  
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnBananas();
  
    spawnRocks();
    
    if(monkey.isTouching(bananaGroup)){
      count = count +2;
      bananaGroup.destroyEach();      
    }

    switch(count){
        case 10: monkey.scale = 0.15;
        break;
        case 20: monkey.scale = 0.2;
        break;
        case 30: monkey.scale = 0.25;
        break;
        case 40: monkey.scale = 0.3;
        break;
        default : break;
    }


    if(rockGroup.isTouching(monkey)){
     // gameState = END;
     monkey.scale = 0.1;
     if(count>0){
        count -=0.05;
     }
    }
  
  
 /* else if(gameState === END) {
    
    
    //set velcity of each game object to 0
    bg.velocityX = 0;
   monkey.velocityY = 0;
   rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
  
   rockGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    
  }*/
  drawSprites();

  fill(255);
  textSize(18);
  text("Score : "+Math.round(count),500,20);
}
function spawnRocks() {
    if(frameCount % 60 === 0) {
      var rock = createSprite(600,265,10,40);
      rock.velocityX = - (6 + 3*count/100);
    rock.addImage(stoneImg);
      
      //assign scale and lifetime to the obstacle           
      rock.scale = 0.1;
      rock.lifetime = 100;
      //add each obstacle to the group
      rockGroup.add(rock);
    }
  }
  
  function spawnBananas() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
      var banana = createSprite(600,320,40,10);
      banana.y = random(80,220);
      banana.addImage(bananaImg);
      banana.scale = 0.05;
      banana.velocityX = -3;
      
       //assign lifetime to the variable
      banana.lifetime = 200;
      
      bananaGroup.add(banana);
    }
    
  }