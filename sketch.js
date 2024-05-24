const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var food;
var fruit,rope;
var fruit_con;
var bg_img , fruit_img , bunny_img;
var bunny;
var blink, sad, eat;
var bg_song, cut_song, sad_sound, eating_sound, air;
var blower;
var btn_mute;

function preload(){
  bg_img = loadImage("./assets/background.png");
  fruit_img = loadImage("./assets/melon.png");
  bunny_img = loadImage("./assets/Rabbit-01.png");
  blink = loadAnimation("./assets/blink_1.png","./assets/blink_2.png","./assets/blink_3.png");
  eat = loadAnimation("./assets/eat_0.png","./assets/eat_1.png","./assets/eat_2.png","./assets/eat_3.png","./assets/eat_4.png");
  sad = loadAnimation("./assets/sad_1.png","./assets/sad_2.png","./assets/sad_3.png");
  bg_song = loadSound("./assets/sound1.mp3");
  cut_song = loadSound("./assets/rope_cut.mp3");
  sad_sound = loadSound("./assets/sad.wav");
  eating_sound = loadSound("./assets/eating_sound.mp3");
  air = loadSound("./assets/air.wav");

  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  bg_song.play();
  bg_song.setVolume(0.3);
  
  blink.frameDelay = 25;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,690,600,20);
  rope = new Rope(10,{x:245,y:30})

  var fruit_opt = {
    density: 0.001,
  }
fruit = Bodies.circle(300,300,20,fruit_opt);
Matter.Composite.add(rope.body,fruit);
fruit_con = new Link(rope,fruit);
bunny = createSprite(250,620,100,100);
bunny.addAnimation("blinkying",blink);
bunny.changeAnimation("blinkying");
bunny.addAnimation("eating",eat);
bunny.addAnimation("crying",sad);
bunny.scale = 0.25;
button = createImg("/assets/cut_button.png");
button.position(220,30);
button.size(50,50);
button.mouseClicked(drop);

blower = createImg("./assets/balloon.png");
blower.position(10,250);
blower.size(150,100);
blower.mouseClicked(airBlown);


btn_mute = createImg("./assets/mute.png");
btn_mute.position(540,20);
btn_mute.size(50,50);
btn_mute.mouseClicked(mute)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
}

function draw() 
{
  background(51);
image(bg_img,width/2,height/2,500,700);
if(fruit != null){
  image(fruit, fruit.position.x, fruit.position.y, 60, 60);
  }
  ground.show();
  rope.show();
  Engine.update(engine);
  if(collide(fruit,bunny)== true){
    bunny.changeAnimation("eating")
    eating_sound.play()

  }
  if(collide(fruit,ground.body)== true){
    bunny.changeAnimation("crying")
    sad_sound.play()
    bg_song.stop()
    fruit = null
    sad_sound.setVolume(0.1)

  }
  drawSprites();   
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut_song.play();
}

function collide(body,sprite){
  if(body != null){
    var d = dist(
      body.position.x,body.position.y,sprite.position.x,sprite.position.y
    )};
    if(d <= 80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    } 
  }
    function airBlown(){
      Matter.Body.applyForce(fuit,{x:0,y:0},{x:0.01,y:0});
      air.play();
    } 

    function mute(){
      if(bg_song.isPlaying()){
        bg_song.stop();
      }
      else{
        bg_song.play();
      }
    }