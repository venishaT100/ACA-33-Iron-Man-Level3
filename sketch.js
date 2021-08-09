var bg, backgroundImg;
var stoneGroup, stoneImage;
var diamondsGroup, diamondImage;
var diamondScore=0;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironManImage = loadImage("images/iron.png");
  stoneImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
}

function setup() {
  createCanvas(1000, 900);
  bg = createSprite(580,500);
  bg.addImage(backgroundImg);
  bg.scale =2;

  ironMan = createSprite(200,505,20,50);
  ironMan.addImage(ironManImage);
  ironMan.scale=0.3;
  ironMan.debug=true;
  ironMan.setCollider("rectangle",100,0,200,400)
  
  stoneGroup = new Group();
  diamondsGroup = new Group();

}

function draw() {
  if (keyDown("up")) {
    ironMan.velocityY = -10;
  }
  if (keyDown("left")) {
    ironMan.x = ironMan.x - 5;
  }
  if (keyDown("right")) {
    ironMan.x = ironMan.x + 5;
}

generateStone();

ironMan.velocityY = ironMan.velocityY + 0.5;

for(var i = 0 ; i< (stoneGroup).length ;i++){
  var temp = (stoneGroup).get(i) ;
  
  if (temp.isTouching(ironMan)) {
     ironMan.collide(temp);
    }     
  }

  if(ironMan.x<20){
    ironMan.x=20;
  }

  if(ironMan.y<100){
    ironMan.y=100;
  }

  generateDiamonds();

  for (var i = 0; i < diamondsGroup.length; i++) {
    var temp = diamondsGroup.get(i);

    if (temp.isTouching(ironMan)) {
      diamondScore++;
      temp.destroy();
      temp = null;
    }
  }
  

function generateStone() {
  if (frameCount % 100 === 0) {
    var stone = createSprite(1200,120,40,10);
    stone.x = random(-30,750);
    stone.addImage(stoneImage);
    stone.scale = 1;
    stone.velocityY = 5;
    stone.lifetime =250;
    stoneGroup.add(stone);
  }
}

function generateDiamonds() {
  if (frameCount % 100 === 0) {
    var diamond = createSprite(1200,120,40,10);
    diamond.x = random(-30,750);
    diamond.addImage(diamondImage);
    diamond.scale = 0.5;
    diamond.velocityY = 10;
    diamond.lifetime =1200;
    diamondsGroup.add(diamond);
  }
}
 
    
    drawSprites();
    textSize(25);
    fill("yellow")
    text("Diamond Colleted: "+ diamondScore, 400,50);
   
}