//Node class
class Node {
  constructor(x,y,g,h){
    this.x = x;
    this.y = y;
  }

  toString(){
    return '('+this.x+','+this.y+')';
  }
}

//------------------------------------------------------------------------------
function astar(start,end,grid){
  //create the open list and closed list
  var openList = [];
  var closedList = [];

  //put the node start in the open list
  start.g = 0;

  openList.push(start);
  var nodesSearched = 0;

  while(openList.length>0){
    if(nodesSearched>(grid.length*grid[0].length)/4) return null;
    var currentNode = openList[0];

    //Find the node with lowest f (the currentNode)
    for(let i = 0; i < openList.length; i++){
      if(i === 0){
        currentNode = openList[i];
      }else if(openList[i].f<currentNode.f){
        currentNode = openList[i];
      }
    }
    //remove currentNode from openList and add it to closedList;
    var index = -1;

    for(let i = 0; i < openList.length; i++){
      if(openList[i].x === currentNode.x && openList[i].y === currentNode.y){
        index = i;
      }
    }

    if(index !== -1){
      openList.splice(index,1);
    }

    closedList.push(currentNode);

    //if currentNode is goal, return the the closedList
    if(currentNode.x === end.x && currentNode.y === end.y){
      return closedList;
    }

    nodesSearched++;

    //generate the neighbors
    var neighbors=[];
    neighbors[0] = new Node(currentNode.x+1,currentNode.y);
    neighbors[1] = new Node(currentNode.x-1,currentNode.y);
    neighbors[2] = new Node(currentNode.x,currentNode.y+1);
    neighbors[3] = new Node(currentNode.x,currentNode.y-1);

    for(let i = 0; i < neighbors.length; i++){
      if(neighbors[i].x<0
        || neighbors[i].x>grid.length-1
        || neighbors[i].y<0
        || neighbors[i].y>grid[neighbors[i].x].length-1
        || grid[neighbors[i].x][neighbors[i].y]!==0//change this depending on your own code
        ){
          continue;
        }

      var index2 = -1;

      for(let j = 0; j < closedList.length; j++){
        if(closedList[j].x === neighbors[i].x && closedList[j].y === neighbors[i].y){
          index = j;
          break;
        }
      }

      if(index2 !== -1) continue;

      neighbors[i].g = currentNode.g+1;
      neighbors[i].h = (end.x - neighbors[i].x)*(end.x - neighbors[i].x)
                     + (end.y - neighbors[i].y)*(end.y - neighbors[i].y);
      neighbors[i].f = neighbors[i].g+neighbors[i].h;

      var alreadyIn = false;
      for(let j = 0; j < openList.length; j++){
        if(openList[j].x === neighbors[i].x
        && openList[j].y === neighbors[i].y){
          if(openList[j].g<neighbors[i].g){
            alreadyIn = true;
            break;
          }
        }

      }
    if(!alreadyIn)openList.push(neighbors[i]);
    }
  }
}
