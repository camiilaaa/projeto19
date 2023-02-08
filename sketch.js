var butterflyImg, butterfly;
var gardenImg, garden;
var beeImg, bee, beesGroup;
var flowerImg, flower, flowersGroup;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
butterflyImg = loadImage ("blue-butterfly-png-clipar-image-5a1c87ad547f02.1412031415118191813461.jpg");
gardenImg = loadImage ("2a941a0e339a1c5a99521d03bd355973.jpg");
beeImg = loadImage ("kisspng-western-honey-bee-vector-graphics-beehive-honeycom-5ccc60f07acbe8.043308551556898032503.jpg");
flowerImg = loadImage ("10001842.jpg");
}

function setup() {
    createCanvas(600,600);
    garden = createSprite(300,300);
    garden.addImage("garden", gardenImg);
    garden.velocityY = 1;

    flowersGroup = new Group();
    beesGroup = new Group();
    invisibleBlockGroup = new Group();

    butterfly = createSprite(200,200,50,50);
    butterfly.scale = 0.1;
    butterfly.addImage("butterfly", butterflyImg);
}

function draw() {
 background(200);
 if(gameState === "play") {

    if(keyDown("left_arrow")){
        butterfly.x = butterfly.x -3;
    }

    if(keyDown("right_arrow")){
        butterfly.x = butterfly.x +3;
    }

    if(keyDown("space")){
        butterfly.velocityY = -5;
    }

    butterfly.velocityY = butterfly.velocityY + 0.8

    if(garden.y > 350){
        garden.y = 200
    }
    spawnFlowers();

    if(beesGroup.isTouching(butterfly)){
       butterfly.velocityY = 0
    }
    if (invisibleBlockGroup.isTouching(butterfly) || butterfly.y > 600){
        butterfly.destroy();
    }
    drawSprites();
 }

 if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("game over", 230,250)
 }
}

function spawnFlowers(){
    if(frameCount % 240 === 0) {
        var flower = createSprite(200,-50);
        flower.addImage(flowerImg);
        flower.scale = 0.1;

        var bee = createSprite(200,10);
        bee.addImage(beeImg);
        bee.scale = 0.1;

        var invisibleBlock = createSprite(200,15);
        invisibleBlock.width = bee.width;
        invisibleBlock.height =2;

        flower.x = Math.round(random(120,400));
        flower.velocityY = 1;

        butterfly.x = flower.x;
        butterfly.velocityY = 1;

        invisibleBlock.x = flower.x;
        invisibleBlock.velocityY = 1;

        flower.lifetime = 800;
        butterfly.lifetime = 800;
        invisibleBlock.lifetime = 800;

        flowersGroup.add(flower);
        beesGroup.add(bee);

        invisibleBlock.debug = true;
        invisibleBlockGroup.add(invisibleBlock);

        butterfly.depth = flower.depth;
        butterfly.depth +=1;
 }
}