//Basic needed references
const p = document.getElementById('prompt');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gameObjects = [];
const x = 50;
const y = 50;
var map = new Map(x,y);
const terminal = new Terminal();

gameObjects.push(new GameObject(0,0));

init();

//EventListeners
p.addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }//make sure to get the window event

    // Enter is pressed
    if (e.keyCode == 13) {
      if(p.value !== "")
      terminal.send(p.value);
      p.value = "";

      //don't forget to remove this init() call
      init();
      update();
      draw();
    }
}, false);

//Main game loop

//Main Init function
function init(){
  map = new Map(x,y);
  //Generate the gold
  let g = (x+y)/8-Math.floor(Math.random()*10);
  for(let i = 0; i < g; i++){
    let randomX = Math.floor(Math.random()*x);
    let randomY = Math.floor(Math.random()*y);

    map.addResource(randomX,randomY,gold);
    map.addResource(x-randomX,y-randomY,gold);
  }

  //Generate the silver
  let s = (x+y)/6-Math.floor(Math.random()*10);
  for(let i = 0; i < s; i++){
    let randomX = Math.floor(Math.random()*x);
    let randomY = Math.floor(Math.random()*y);

    map.addResource(randomX,randomY,silver);
    map.addResource(x-randomX,y-randomY,silver);

  }

  //Generate the bronze
  let b = (x+y)/6-Math.floor(Math.random()*10);
  for(let i = 0; i < s; i++){
    let randomX = Math.floor(Math.random()*x);
    let randomY = Math.floor(Math.random()*y);

    map.addResource(randomX,randomY,bronze);
    map.addResource(x-randomX,y-randomY,bronze);

  }

  console.log('init');
}

//Main update function
function update(){
  //Update all the gameObjects
  gameObjects.forEach(object => object.update());

  let randomX = Math.floor(Math.random()*map.width);
  let randomY = Math.floor(Math.random()*map.height);

  map.addBuilding(randomX,randomY,baseA);
  map.addBuilding(x-randomX,y-randomY,baseB);
}

//Canvas Functions
function draw(){
  //Make the canvas fit the space
  ctx.canvas.width  = window.innerWidth*0.65;
  ctx.canvas.height = window.innerHeight*0.65;

  //Draw the Map
  map.draw(ctx);

  //Draw all the gameObjects
  gameObjects.forEach(object => object.draw(ctx));
}
