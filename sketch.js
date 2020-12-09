var dog,happydog,foodstock,foodS,database,dogI,happydogI;

function preload(){
  dogI = loadImage('images/dogImg.png');
  happydogI = loadImage('images/dogImg1.png');
}

function setup(){
  createCanvas(450, 450);
  dog = createSprite(200,200,5,5);
  dog.addImage(dogI);
  dog.scale=0.5;
  drawSprites();

  database = firebase.database();
  foodstock=database.ref('Food');
  foodstock.on("value",readStock);
}

function draw(){
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogI);
    dog.scale=0.5;
  }

  if (keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    dog.addImage(dogI);
  }

  

  drawSprites();
  textSize(20);

  text("Press the up arrow key to ", 50,130);
  fill("black");
  stroke(2);

  text("make Drago hungry", 50,180);
  fill(0);
  stroke(2);

  text("Food Remaining  " + foodS, 50,250);
  fill(0);
  stroke(4);
}

function readStock(data){
  foodS = data.val();
}

function writeStock (x) {
  if (x<=0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}



