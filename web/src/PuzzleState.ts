export interface PuzzleState {
  width: number;
  height: number;
  nodes: PuzzleNode[][];
}

export interface PuzzleNode {
  isEmpty: boolean;
  solution?: [string, string];
  solutionIdx?: [number, number];
  clues?: [string, string];
}
