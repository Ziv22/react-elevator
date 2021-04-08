import Elevator from "./Elevator";
import Floor from "./Floor";
import { makeObservable, observable, action } from "mobx";
import { MovementEnum } from "../utils/MovementEnum";

export default class Board {
  constructor(floorsNum, elevatorsNum) {
    this.floorsNum = floorsNum;
    this.elevatorsNum = elevatorsNum;
    this.queue = [];
    this.board = this._generateBoard();
    this.elevators = this._generateElevators();
    this.floors = this._generateFloors();
    this.placeElevatorsOnStart();
    makeObservable(this, {
      board: observable,
      elevators: observable,
      placeElevator: action,
      orderElevator: action,
    });
  }
  _generateBoard() {
    if (this.elevatorsNum && this.floorsNum) {
      const board = [];
      for (let e = 0; e < this.floorsNum; e++) {
        board.push([]);
        for (let f = 0; f < this.elevatorsNum; f++) {
          board[e].push("-");
        }
      }
      return board;
    } else {
      console.log(
        `_generateBoard Should receive floorsNum, elevatorsNum but got ${this.floorsNum}, ${this.elevatorsNum}`
      );
    }
  }

  _generateElevators() {
    const elevators = [];
    for (let i = 0; i < this.elevatorsNum; i++) {
      elevators.push(new Elevator(i));
    }
    return elevators;
  }

  _generateFloors() {
    const floors = [];
    for (let i = 0; i < this.floorsNum; i++) {
      floors.push(new Floor(i));
    }
    return floors;
  }

  placeElevatorsOnStart() {
    this.elevators.forEach((e) => {
      this.placeElevator(e.previousFloor, e.currentFloor, e.id);
    });
  }

  placeElevator(currentFloor, previousFloor, id) {
    this.board[previousFloor][id] = "-";
    this.board[currentFloor][id] = id;
  }

  addToQueue(floorsNum) {
    this.queue.push(floorsNum);
  }
  nextFromQueue() {
    return this.queue.shift();
  }

  availableElevators() {
    return this.elevators.filter((e) => e.movementStatus === MovementEnum.idle);
  }

  getClosestElevator(elevators, floorNum) {
    return elevators.reduce((prev, curr) =>
      Math.abs(curr.currentFloor - floorNum) <
      Math.abs(prev.currentFloor - floorNum)
        ? curr
        : prev
    );
  }

  orderElevator() {
    const elevators = this.availableElevators();
    if (elevators.length) {
      const floorNum = this.nextFromQueue();
      const closestElevator = this.getClosestElevator(elevators, floorNum);
      closestElevator.goTo(this.floors[floorNum], this);
      console.log(`Log: ordered elevator number ${closestElevator.id}`);
    }
  }

  sendElevator(floorNum) {
    this.addToQueue(floorNum);
    this.orderElevator();
  }
}
