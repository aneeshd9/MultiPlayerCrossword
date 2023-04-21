import { useState } from "react";
import Picker from "./Picker";
import { PuzzleState } from "./PuzzleState";

function Board() {
  const [state, setState] = useState<PuzzleState>();

  if (state) {
    return <div>This is the board!</div>;
  } else {
    return <Picker />;
  }
}

export default Board;
