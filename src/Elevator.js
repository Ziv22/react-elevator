import { MovementEnum } from "./utils/MovementEnum";
import { Constants } from "./utils/constants";
import { action, makeObservable, observable } from "mobx";
// import { elevatorBellDing } from "./assets/elevator-bell-ding";

export default class Elevator {
  constructor(id) {
    this.id = id;
    this.directionIsUp = true;
    this.movementStatus = MovementEnum.idle;
    this.previousFloor = 0;
    this.currentFloor = 0;
    this.targetFloor = 0;
    this.intervalId = null;
    this.board = null;
    this.floorInstance = null;

    makeObservable(this, {
      movementStatus: observable,
      currentFloor: observable,
      goTo: action,
      suspend: action,
      move: action,
      moveOneFloor: action,
      changeMovementStatus: action,
    });
  }

  changeMovementStatus(status) {
    this.movementStatus = status;
  }

  goTo(floor, board) {
    this.targetFloor = floor.id;
    this.directionIsUp =
      this.targetFloor > this.currentFloor ||
      this.targetFloor === this.currentFloor;
    this.changeMovementStatus(MovementEnum.moving);
    this.board = board;
    this.floorInstance = floor;
    this.floorInstance.setElevator(this);
    setTimeout(() => {
      this.move();
    }, 1000);
  }

  suspend() {
    this.changeMovementStatus(MovementEnum.suspended);
    setTimeout(() => {
      this.changeMovementStatus(MovementEnum.idle);
      this.floorInstance.clearElevator();
      if (this.board.queue.length) {
        this.board.orderElevator();
      }
    }, Constants.suspension);
  }

  moveOneFloor(moveUp) {
    if (this.targetFloor !== this.currentFloor) {
      this.previousFloor = this.currentFloor;
      this.currentFloor = this.targetFloor;
      this.board.placeElevator   (this.previousFloor, this.currentFloor, this.id);
    }
  }

  move() {
    this.moveOneFloor(this.directionIsUp);
    this.suspend();
  }

  playSound() {
    const audio = new Audio("./assets/elevator-bell-ding");
    audio.play();
  }
}
