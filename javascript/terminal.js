const c = document.getElementById('console');

class Terminal {
  constructor(){
    this.selection = null;
    this.buffers = [];
  }

  send(input){
    this.buffers.push(input);
    let command = input.split(' ');

    while (command.length>0){
      let word = command.shift();
      //if(command)
      switch(word){
        case 'select':
        let selection = command.shift();
        let x = parseInt(command.shift());
        let y = parseInt(command.shift());
        this.select(selection,x,y);
        break;
        case 'selection':
        printLine(this.selection+' is selected');
        break;
        case 'move':
        if(this.selection !== null){
          let x = parseInt(command.shift());
          let y = parseInt(command.shift());
          this.selection.moveTo(x,y);
        }else{
          error('cannot move without selecting first');
        }
        break;
        case 'build':
        if(this.selection.type === 'builder'){
          let building = command.shift();
          this.selection.build(building);
        }else{
          error(this.selection+' is not a builder');
        }
        break;
        case 'make':
        if(this.selection.type === 'base'
        || this.selection.type === 'mine'
        || this.selection.type === 'armory'){
          this.selection.taskList.push(new Make(this.selection.x,
            this.selection.y,
            this.selection.unitType,
            this.selection.team));
        }else{
          error(this.selection+' is not a building');
        }
        break;
        case 'clear':
        clear();
        break;
        case 'list':
        gameObjects.forEach(object => {
          printLine(object);
        })
        break;
        default :
        error("command '"+word+"' does not exist");
        command = [];
        break;
      }

    }
  }

  select(selection,x,y){
    //find the object in gameObjects[]
    this.selection = null;
    gameObjects.forEach(object => {
      if(object.type === selection && object.x === x && object.y === y){
        this.selection = object;
      }
    })
    //if it exists

    if(this.selection!==null){
      printLine('selected '+this.selection);
    }else{
      error(selection+' '+x+' '+y+' does not exist');
    }

    //if it doesn't
    // this.selection = 'null';
    // error("cannot select '"+selection+"'");
  }

  move(x,y){
    if(this.selection!=='null'){
      printLine('moving '+this.selection+'...');
    }
  }
}

//Terminal Utils
function print(input){
  c.value += input;
  c.scrollTop = c.scrollHeight;
}

function printLine(input){
  c.value += input+'\n';
  c.scrollTop = c.scrollHeight;
}

function error(input){
  printLine('error: '+input);
}

function clear(){
  c.value = '';
  c.scrollTop = c.scrollHeight;
}
