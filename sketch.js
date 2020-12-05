const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var box1, pig1;
var backgroundImg;
var score=0;
var birds=[];
var flying;
var snott;
var select;

var gamestate = "start";

function preload() {

    //chbg();

    flying=loadSound("bird_flying.mp3");
    snott=loadSound("pig_snort.mp3");
    select=loadSound("bird_select.mp3");    
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    
    ground = new Ground(600,height,1200,20);
    platform= new Ground(180,480,380,250);
    box1 = new Box(700,520,70,70);
    box2 = new Box(920,520,70,70);
    pig1 = new Pig(810, 550);
    log1 = new Log(810,460,300, PI/2);

    box3 = new Box(700,440,70,70);
    box4 = new Box(920,440,70,70);
    pig2 = new Pig(810, 420);

    log3 =  new Log(810,380,300, PI/2);

    box5 = new Box(810,360,70,70);
    log4 = new Log(760,320,150, PI/7);
    log5 = new Log(870,320,150, -PI/7);

    bird = new Bird(250,200);
    bird2 = new Bird(200,370);
    bird3 = new Bird(150,370);
    bird4 = new Bird(100,370);

    birds.push(bird4);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);

    slingshot = new SlingShot(bird.body,{x:250,y:200})

}

function draw(){

//if(backgroundImg){

    background(0);

//}

    //text(mouseY,150,200);
    //text(mouseX,150,100);

    fill("red");
    textSize(25);
    text("Score= "+score,1000,40);
    
    Engine.update(engine);

    

    box1.display();
    box2.display();
    ground.display();
    pig1.score();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig2.score();
    pig2.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();

    slingshot.display();

    platform.display();

    

}


function mouseDragged(){

  if(gamestate!="play"){

    Matter.Body.setPosition(birds[birds.length-1].body,{x:mouseX,y:mouseY});
    Matter.Body.applyForce(birds[birds.length-1].body,birds[birds.length-1].body.position,{x:5,y:-10});

  }

}

function mouseReleased(){

    slingshot.fly();
    gamestate = "play";
    birds.pop();
    flying.play();

}

function keyPressed(){

    if(keyCode===32 && gamestate==="play"){

    if(birds.length>=0){

    Matter.Body.setPosition(birds[birds.length-1].body,{x:250,y:200});
    slingshot.attach(birds[birds.length-1].body);
    bird.trajectory=[];
    bird2.trajectory=[];
    bird3.trajectory=[];
    bird4.trajectory=[];
    gamestate = "start"
    select.play();

    }

    
    }
}

async function chbg(){

    var x = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var xjson = await x.json();
    var dt = xjson.datetime
    var hour = dt.slice(11,13);

if(hour>6 && hour<19){

    bg = "sprites/bg.png"

}
else

 bg = "sprites/bg2.jpg"
 backgroundImg = loadImage(bg);  

}
