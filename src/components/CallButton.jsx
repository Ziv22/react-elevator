import { observer } from "mobx-react-lite";
import { MovementEnum } from "../utils/MovementEnum";

export const CallButton = observer((props) => {
    const {board, floor} = props;
    if(floor?.assignedElevator?.movementStatus){
      console.log(floor?.assignedElevator?.movementStatus);
    }

    const getClass = () => {
      if(floor?.assignedElevator?.movementStatus === MovementEnum.moving){
          return "floor-waiting"
      } else if(floor?.assignedElevator?.movementStatus === MovementEnum.suspended) {
          return "floor-arrived"
      }
  }

    const getText = () => {
      if(floor?.assignedElevator?.movementStatus === MovementEnum.moving){
          return "Waiting"
      } else if(floor?.assignedElevator?.movementStatus === MovementEnum.suspended) {
          return "Arrived"
      } else {
        return "Call"
      }
  }

    return (
        <button
        className={`call-button ${getClass()}`}
        onClick={() => {
          board.board.sendElevator(floor.id);
        }}
      >
        {getText()}
      </button>
)})