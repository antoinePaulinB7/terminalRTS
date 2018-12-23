class GameObject {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  update(){
    this.x++;
    this.y++;
  }

  draw(ctx){
    ctx.fillRect(this.x,this.y,50,50);
  }

}
