//Basic needed references
const p = document.getElementById('prompt');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gameObjects = [];
const map = new Map(100,100);
const terminal = new Terminal();

gameObjects.push(new GameObject(0,0));

var x = 50;
var y = 50;

//EventListeners
p.addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }//make sure to get the window event

    // Enter is pressed
    if (e.keyCode == 13) {
      if(p.value !== "")
      terminal.send(p.value);
      p.value = "";

      update();
      draw();
    }
}, false);

//Main game loop

//Main update function
function update(){
  //Update all the gameObjects
  gameObjects.forEach(object => object.update());
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
