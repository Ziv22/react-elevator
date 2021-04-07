import { observer } from "mobx-react-lite";
import { useState } from "react";
import { MovementEnum } from "../utils/MovementEnum";

export const CallButton = observer((props) => {
    const {board, floor} = props;

    const [clicked, setClicked] = useState(false);

    const isMoving = () =>{
      return floor?.assignedElevator?.movementStatus === MovementEnum.moving
    }

    const isSuspended = () =>{
      return floor?.assignedElevator?.movementStatus === MovementEnum.suspended
    }

    const sendElevator = () =>{
      board.sendElevator(floor.id)
    }

    const getClass = () => { 
      if(isMoving()){
          return "floor-waiting"
      } else if(isSuspended()) {
          return "floor-arrived"
      } else {
        return ""
      }
    }

    const getText = () => {
      if(isMoving()){
          return "Waiting"
      } else if(isSuspended()) {
          return "Arrived"
      } else {
        return "Call"
      }
    }

    return (
        <button
        className={`call-button ${getClass()}`}
        onClick={sendElevator}
      >
        {getText()}
      </button>
)})