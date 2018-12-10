const teamA = 'blue';
const teamB = 'green';

class Unit extends GameObject {
  constructor(x,y,type,team){
    super(x,y);
    this.type = type;
    this.team = team;
    switch(type){
      case 'builder':
      this.speed = 2;
      this.hp = 1;
      this.build = function(building){
        map.addBuilding(this.x,this.y,building);
      };
      break;
      case 'miner':
      this.speed = 1;
      this.hp = 3;
      this.mine = function(x,y){

      };
      this.resources = 0;
      break;
      case 'soldier':
      this.speed = 3;
      this.hp = 2;
      this.attack = function(x,y){

      };
      break;
    }


  }

  update(){

  }

  draw(ctx){
    let oldFillStyle = ctx.fillStyle;
    let oldStrokeStyle = ctx.strokeStyle;

    let dx = ctx.canvas.width/map.width;
    let dy = ctx.canvas.height/map.height;

    ctx.fillStyle = this.team;
    ctx.strokeStyle = this.team;

    ctx.strokeRect(this.x*dx, this.y*dy, dx, dy);
    ctx.strokeText(this.type, this.x*dx+dx, this.y*dy);

    ctx.fillStyle = oldFillStyle;
    ctx.strokeStyle = oldStrokeStyle;

    console.log('drawing a '+this.type+' at '+this.x*dx+' '+this.y*dy);
  }

  move(x,y){

  }

  moveTo(x,y){

  }

  toString(){
    return this.type+" : "+this.x+" "+this.y+" "+this.team;
  }
}

class MoveTo extends Routine {

  constructor(destX,destY){
    super();
    this.destX = destX;
    this.destY = destY;
  }

  reset(){
    start();
  }

  act(unit,map){
    if(!pathExists(unit,map)){
      fail();
      return;
    }
    if(!isUnitAtDestination(unit)){
      moveUnit(unit);
    }
  }

  moveUnit(unit){

  }

}
