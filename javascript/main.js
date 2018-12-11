//Basic needed references
const p = document.getElementById('prompt');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//remember to set it back to const
var gameObjects = [];
const x = 50;
const y = 50;
//remember to set it back to const
const map = new Map(x,y);
const terminal = new Terminal();

//gameObjects.push(new GameObject(0,0));
init();
draw();

//resizing the window
function resize(){
  //Make the canvas fit the space
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width*0.65;
  canvas.height = height;

  //Make the console&prompt fit in the window
  document.getElementById('console').style.height = height-30+"px";
}

window.onresize = resize;

//EventListeners
var iterator = 0;
p.addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }//make sure to get the window event

    // Enter is pressed
    if (e.keyCode == 13) {
      if(p.value !== "")
      terminal.send(p.value);
      p.value = "";
      iterator = terminal.buffers.length;

      //don't forget to remove this init() call
      //init();
      // update();
      // draw();
    }

    if (e.keyCode == 38){//pressing up
      if(iterator>0){
        iterator--;
        p.value = terminal.buffers[iterator];
      }
    }

    if (e.keyCode == 40){//pressing down
      if(iterator<terminal.buffers.length-1){
        iterator++;
        p.value = terminal.buffers[iterator];
      }
    }
}, false);

//Main Init function
function init(){
  var routine = new Routine();
  console.log(routine.state === RoutineState.Success);
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

  //generate a builder
  gameObjects.push(new Unit(25,25,'builder',A));
  gameObjects.push(new Unit(15,25,'miner',A));
  gameObjects.push(new Unit(25,15,'soldier',A));
  printLine('initialization... done');
}

var counter = 0;

//Main update function
function update(){
  //Update all the gameObjects
  gameObjects.forEach(object => object.update());

  // let randomX = Math.floor(Math.random()*map.width);
  // let randomY = Math.floor(Math.random()*map.height);
  //
  // map.addBuilding(randomX,randomY,baseA);
  // map.addBuilding(x-randomX,y-randomY,baseB);

  // counter++;
  // printLine('counter : '+counter);
}

//Canvas Functions
function draw(){
  resize();
  //Draw the Map
  map.draw(ctx);

  //Draw all the gameObjects
  gameObjects.forEach(object => object.draw(ctx));
}


//Main game loop
function loop(){
  update();
  draw();
}

setInterval(loop,1000);
