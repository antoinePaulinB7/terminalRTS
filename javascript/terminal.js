const c = document.getElementById('console');

class Terminal {
  constructor(){
    this.selection = 'null';
  }

  send(input){
    //printLine(input);
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

    //if it doesn'//
    this.selection = 'null';
    error("cannot select '"+selection+"'");
  }

  move(x,y){
    if(selection!=='null'){

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
