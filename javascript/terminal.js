const c = document.getElementById('console');

class Terminal {
  constructor(){
    this.selection = 'null';
    this.buffers = [];
  }

  send(input){
    //printLine(input);
    this.buffers.push(input);
    let command = input.split(' ');

    while (command.length>0){
      let word = command.shift();
      //if(command)
      switch(word){
        case 'select':
        let selection = command.shift();
        this.select(selection);
        break;
        case 'selection':
        printLine(this.selection+' is selected');
        break;
        case 'move':
        let x = command.shift();
        let y = command.shift();
        this.move(x,y);
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

  select(selection){
    //find the object in gameObjects[]

    //if it exists
    this.selection = selection;
    printLine('selected '+selection);

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
  var c = document.getElementById("console");
  c.value += input;
  c.scrollTop = c.scrollHeight;
}

function printLine(input){
  var c = document.getElementById("console");
  c.value += input+'\n';
  c.scrollTop = c.scrollHeight;
}

function error(input){
  printLine('error: '+input);
}

function clear(){
  var c = document.getElementById("console");
  c.value = '';
  c.scrollTop = c.scrollHeight;
}
