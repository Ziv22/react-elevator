import "./App.css";
import { observer } from "mobx-react-lite";
import { Elevator } from "./components/Elevator";
import { CallButton } from "./components/CallButton";
import { getFloorName } from "./utils/floorNames";

const App = observer((props) => {
  const { board } = props.board;

  return (
    <div className="App">
      {board
        .map((floor, index) => (
          <div key={index}>
            <div className="floor-name u-bold">{getFloorName(index)} </div>
            {floor.map((elevator, i) =>
              typeof elevator === "number" ? (
                <Elevator board={props.board} key={i} elevator={elevator} />
              ) : (
                <div key={i} className="elevator"></div>
              )
            )}
            <CallButton board={props} floor={props.board.floors[index]} />
          </div>
        ))
        .reverse()}
    </div>
  );
});

export default App;
