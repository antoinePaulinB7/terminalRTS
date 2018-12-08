//Enums in JavaScript :DDD
const RoutineState = {"Success":1,"Failure":2,"Running":3};
Object.freeze(RoutineState);

class Routine {
  constructor(){
    this.state = null;
  }

  start(){
    this.state = RoutineState.Running;
  }

  reset(){

  }

  act(unit, map){

  }

  succeed(){
    this.state = RoutineState.Success;
  }

  fail(){
    this.state = RoutineState.Failure;
  }

  isSuccess(){
    return this.state === RoutineState.Success;
  }

  isFailure(){
    return this.state === RoutineState.Failure;
  }

  isRunning(){
    return this.state === RoutineState.Running;
  }
  get state(){
    return this.state;
  }
}
