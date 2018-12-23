var baseMasterID = 0;
var mineMasterID = 0;
var armoryMasterID = 0;

class Building extends GameObject {
  constructor(x,y,type,team){
    super(x,y);
    this.type = type;
    this.team = team;

    this.taskList = [];

    switch(type){
      case 'base':
      this.resources = 0;
      this.unitType = 'builder';
      this.id = baseMasterID++;
      break;
      case 'mine':
      this.resources = 0;
      this.unitType = 'miner';
      this.id = mineMasterID++;
      break;
      case 'armory':
      this.unitType = 'soldier';
      this.id = armoryMasterID++;
      break;
    }

    map.addBuilding(x,y,type);
  }

  update(){
    if(this.taskList[0]!=null){
      this.taskList[0].update();
      if(this.taskList[0].isComplete())this.taskList.shift();
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

  toString(){
    return this.type+" "+this.id+" : "+this.x+" "+this.y+" "+this.team;
  }

}

class Make {
  constructor(x,y,unitType, team){
    this.x = x;
    this.y = y;

    this.unitType = unitType;
    this.unitTeam = team;

    this.timer = 0;//in ticks or frames
    this.complete = false;

    switch(unitType){
      case 'builder':
      this.timer = 30;

      break;
      case 'miner':
      this.timer = 10;

      break;
      case 'soldier':
      this.timer = 70;

      break;
    }

  }

  update(){
    this.timer--;
    if(this.timer<=0) this.execute();
  }

  execute(){
    gameObjects.push(new Unit(this.x,this.y,this.unitType,this.unitTeam));
    this.complete = true;
  }

  isComplete(){
    return this.complete;
  }

}
