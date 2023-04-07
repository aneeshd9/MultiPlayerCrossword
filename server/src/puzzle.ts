import fs from "fs";

class Puzzle {
  width: number
  height: number
  solution: string
  clues: string

  constructor(width: number,
              height: number,
              solution: string, clues: string) {
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

  return new Puzzle(width, height, solution, clues);
}

