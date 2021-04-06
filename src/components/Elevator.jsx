import {ElevatorIcon} from "./icons-elevator";
import { observer } from "mobx-react-lite";
import { MovementEnum } from "../utils/MovementEnum";

export const Elevator = observer ((props) => {
    const {elevator} = props 
    const thisElevator = props.board.elevators[elevator];

    const getClass = () => {
        if(thisElevator.movementStatus === MovementEnum.moving){
            return "elevator-moving"
        } else if(thisElevator.movementStatus === MovementEnum.suspended) {
            return "elevator-suspended"
        } else {
            return " "
        }
    }
    return (
        <div className={`elevator ${getClass()}`}>
            <ElevatorIcon className={`elevator-icon`} />
        </div>
)})