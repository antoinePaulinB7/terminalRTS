class GameObject {

  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  update(){
    x++;
    y++;
  }

  draw(ctx){
    ctx.fillRect(x,y,50,50);
  }

}
