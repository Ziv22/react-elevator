import { action, makeObservable, observable } from "mobx";

export default class Floor {
  constructor(id) {
    this.id = id;
    this.assignedElevator = null;

    makeObservable(this, {
      assignedElevator: observable,
      setElevator: action,
      clearElevator: action,
    });
  }

  setElevator(elevator) {
    this.assignedElevator = elevator;
  }

  clearElevator() {
    this.assignedElevator = null;
  }
}
