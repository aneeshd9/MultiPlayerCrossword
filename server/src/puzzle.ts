import fs from "fs";

class PuzzleNode {
  row: number;
  col: number;
  state: string;
  solution: string;
  clue: string;
  index: number;
  isBlocked: boolean;

  constructor() {
    this.row = -1;
    this.col = -1;
    this.state = "";
    this.solution = "";
    this.clue = "";
    this.index = -1;
    this.isBlocked = false;
  }
}

class Puzzle {
  width: number;
  height: number;
  solution: string;
  clues: string[];

  state: PuzzleNode[][];

  constructor(width: number,
              height: number,
              solution: string, clues: string[]) {
    this.width = width;
    this.height = height;
    this.solution = solution;
    this.clues = clues;
  }
}

export function parsePuzFile(filePath: string) {
  const buffer = fs.readFileSync(filePath);

  const width = buffer.readUInt8(44);
  const height = buffer.readUInt8(45);
  const solution = buffer.toString("utf-8", 52, 52 + width * height);
  const clues = buffer.toString("utf-8", 52 + width * height);
  const cluesArray = clues.split("\x00").slice(3);

  return new Puzzle(width, height, solution, cluesArray);
}

