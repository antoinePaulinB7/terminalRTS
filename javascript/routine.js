//Enums in JavaScript :DDD
const RoutineState = {"Success":1,"Failure":2,"Running":3};
Object.freeze(RoutineState);

class Routine {
  constructor(){
    this.status = null;
  }

  start(){
    this.status = RoutineState.Running;
  }

  reset(){

  }

  act(unit, map){

  }

  succeed(){
    this.status = RoutineState.Success;
  }

  fail(){
    this.status = RoutineState.Failure;
  }

  isSuccess(){
    return this.status === RoutineState.Success;
  }

  isFailure(){
    return this.status === RoutineState.Failure;
  }

  isRunning(){
    return this.status === RoutineState.Running;
  }
  get state(){
    return this.status;
  }

  set state(s){
    this.status = s;
  }
}
