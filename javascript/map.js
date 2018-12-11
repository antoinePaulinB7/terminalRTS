//FillStyle constants
const empty = 'black';

//RESOURCES
const gold = 'gold';
const silver = 'silver';
const bronze = 'brown';

//BUILDINGS
const baseA = 'blue';
const mineA = 'skyblue';
const armoryA = 'darkblue';

const baseB = 'lime';
const mineB = 'green';
const armoryB = 'darkgreen';

const wall = 'black';

class Map {
  constructor(width,height){
    this.width = width;
    this.height = height;

    this.ground = [];
    this.buildings = [];
    for(let i = 0; i < width; i++){
      this.ground[i] = [];
      this.buildings[i] = [];
      for(let j = 0; j < height; j++){
        this.ground[i][j] = empty;
        this.buildings[i][j] = empty;
      }
    }

  }

  draw(ctx){
    const oldFillStyle = ctx.fillStyle;

    let dx = ctx.canvas.width/this.width;
    let dy = ctx.canvas.height/this.height;

    for(let x = 0; x < this.ground.length; x++){
      for(let y = 0; y < this.ground[x].length; y++){
        ctx.fillStyle = this.ground[x][y];
        ctx.fillRect(x*dx,y*dy,dx,dy);

        if(this.buildings[x][y]!==empty){
          ctx.fillStyle = this.buildings[x][y];
          ctx.fillRect(x*dx,y*dy,dx,dy);
        }
      }
    }

    ctx.fillStyle = oldFillStyle;
  }

  addResource(x,y,resource){
    if(x>=0 && y>=0 &&x<this.width&&y<this.height){
      this.ground[x][y] = resource;
    }
  }

  addBuilding(x,y,building){
    if(x>=0 && y>=0 &&x<this.width&&y<this.height){
      if(this.ground[x][y]===empty)this.buildings[x][y] = building;
    }
  }

  removeResource(x,y){
    if(x>=0 && y>=0 &&x<this.width&&y<this.height){
      this.ground[x][y] = empty;
    }
  }

  removeBuilding(x,y){
    if(x>=0 && y>=0 &&x<this.width&&y<this.height){
      this.buildings[x][y] = empty;
    }
  }

}
