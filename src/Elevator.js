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
      floorInstance: observable,
      goTo: action,
      suspend: action,
      move: action,
      moveOneFloor: action,
    });
  }

  goTo(floor, board) {
    this.targetFloor = floor.id;
    this.directionIsUp =
      this.targetFloor > this.currentFloor ||
      this.targetFloor === this.currentFloor;
    this.movementStatus = MovementEnum.moving;
    this.board = board;
    this.floorInstance = floor;
    this.floorInstance.setElevator(this);
    this.move();
  }

  suspend() {
    this.movementStatus = MovementEnum.suspended;
    setTimeout(() => {
      this.movementStatus = MovementEnum.idle;
      if (this.board.queue.length) {
        this.board.orderElevator();
      }
    }, Constants.suspension);
  }

  changeToIdle() {
    this.movementStatus = MovementEnum.idle;
  }

  moveOneFloor(moveUp) {
    if (this.targetFloor !== this.currentFloor) {
      this.previousFloor = this.currentFloor;
      if (moveUp) {
        this.currentFloor++;
      } else {
        this.currentFloor--;
      }
      this.board.placeElevators();
    }
  }

  move() {
    console.log(
      `Elevator ${this.id} start moving... status ${this.movementStatus}`
    );
    this.intervalId = setInterval(() => {
      this.moveOneFloor(this.directionIsUp);
      if (this.targetFloor === this.currentFloor) {
        clearInterval(this.intervalId);
        this.suspend();
      }
    }, Constants.moveSpeed);
  }

  playSound() {
    const audio = new Audio("./assets/elevator-bell-ding");
    audio.play();
  }
}
