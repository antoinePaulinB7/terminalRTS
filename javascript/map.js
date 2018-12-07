class Map {
  constructor(width,height){
    this.width = width;
    this.height = height;

    this.grid = [];
    for(let i = 0; i < width; i++){
      this.grid[i] = [];
      for(let j = 0; j < height; j++){
        this.grid[i][j] = 0;
      }
    }

  }

  draw(ctx){
    var oldFillStyle = ctx.fillStyle;
    let dx = ctx.canvas.width/this.width;
    let dy = ctx.canvas.height/this.height;

    for(let x = 0; x < this.grid.length; x++){
      for(let y = 0; y < this.grid[x].length; y++){
        ctx.fillStyle = Math.random() > 0.5 ? 'red':'green';
        ctx.fillRect(x*dx,y*dy,dx,dy);
      }
    }

    console.log(dx+' '+dy);

    ctx.fillStyle = oldFillStyle;
  }

}
