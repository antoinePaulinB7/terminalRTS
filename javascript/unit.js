const A ='blue';
const B ='green';

class Unit extends GameObject {
  constructor(x,y,type,team){
    super(x,y);
    this.type = type;
    this.team = team;
    this.speed = 1;
    switch(type){
      case 'builder':
      this.speed = 2;
      this.hp = 1;
      this.build = function(building){
        let buildingToAdd = null;
        switch(this.team){
          case A:
            if(building === 'base') buildingToAdd = baseA;
            if(building === 'mine') buildingToAdd = mineA;
            if(building === 'armory') buildingToAdd = armoryA;
            break;
          case B:
          if(building === 'base') buildingToAdd = baseB;
          if(building === 'mine') buildingToAdd = mineB;
          if(building === 'armory') buildingToAdd = armoryB;
            break;
        }
        if(buildingToAdd !== null){
          gameObjects.push(new Building(this.x,this.y,building,this.team));
          printLine(this.team+' '+building+' built');
        }else{
          error(building+' does not exist');
        }
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
    this.routine = null;
  }

  update(){
    if(this.routine !== null){
      this.routine.act(this);
      if(this.routine.isSuccess()||this.routine.isFailure())this.routine = null;
    }
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
  }

  move(x,y){

  }

  moveTo(x,y){
    printLine(this+' moving to '+x+' '+y);
    var start = new Node(this.x,this.y);
    var end = new Node(x,y);

    this.routine = new MoveTo(start,end,map.buildings);
    this.routine.startR();
  }

  toString(){
    return this.type+" : "+this.x+" "+this.y+" "+this.team;
  }
}

class MoveTo extends Routine {

  constructor(start,end,map){
    super();
    this.start = start;
    this.end = end;
    this.map = map;
  }

  startR(){
    this.status = Routine.Running;
  }

  act(unit){
    this.path = astar(this.start,this.end,this.map);
    if(this.path === null || this.path === undefined){
      this.fail();
      printLine('fail');
      return;
    }

    if(!(this.isUnitAtDestination(unit,this.end))){
      this.moveUnit(unit);
      //printLine('moving');
    }else{
      this.succeed();
      printLine('success');
    }
  }

  moveUnit(unit){
    //printLine('moving from moveUnit');
    // printLine(unit);
    // printLine(unit.speed);
    for(let p = 0; p < unit.speed; p++){
      if(this.path.length>1){
        this.path.shift();
      }
    }
    unit.x = this.path[0].x;
    unit.y = this.path[0].y;

    this.start = new Node(unit.x,unit.y);
  }

  isUnitAtDestination(unit, end){
    return unit.x === end.x && unit.y === end.y;
  }

}
