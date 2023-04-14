import fs from "fs";

export enum ClueType {
  ACROSS,
  DOWN
}

class PuzzleNode {
  public row: number;
  public col: number;
  public isEmpty: boolean;
  public solution: string[];
  public solutionIdx: number[];
  public clues: string[];
}

export class Puzzle {
  private _width_offset: number = 44;
  private _height_offset: number = 45;
  private _solution_offset: number = 52;

  private _puzBytes: Uint8Array;
  private _width: number;
  private _height: number;
  private _solution: string[][];
  private _state: PuzzleNode[][];

  constructor(puzFilePath: string) {
    this._puzBytes = fs.readFileSync(puzFilePath);
    this._width = this._puzBytes.at(this._width_offset);
    this._height = this._puzBytes.at(this._height_offset);

    const solutionStart: number = this._solution_offset;
    const solutionEnd: number = solutionStart + (this._width * this._height);
    const solutionString = new TextDecoder().decode(this._puzBytes.slice(solutionStart, solutionEnd));
    this._solution = this._initSolution(solutionString);

    this._state = this._initState();
    
    const clues = new TextDecoder().decode(this._puzBytes.slice(solutionEnd)).split("\0").slice(3);
    this._setClues(clues);
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public isEmpty(x: number, y: number): boolean {
    return this._state[x][y].isEmpty;
  }

  public solution(x: number, y: number, clueType: ClueType): string {
    return this._state[x][y].solution[clueType];
  }

  public solutionIdx(x: number, y: number, clueType: ClueType): number {
    return this._state[x][y].solutionIdx[clueType];
  }

  public clue(x: number, y: number, clueType: ClueType): string {
    return this._state[x][y].clues[clueType];
  }

  private _initSolution(solutionString: string): string[][] {
    const solution: string[][] = [];
    var idx: number = 0;
    for (var r = 0; r < this._height; ++r) {
      solution[r] = [];
      for (var c = 0; c < this._width; ++c) {
        solution[r][c] = solutionString.at(idx);
        ++idx;
      }
    }
    return solution;
  }

  private _initState(): PuzzleNode[][] {
    const state: PuzzleNode[][] = [];
    
    for (var r = 0; r < this._height; ++r) {
      state[r] = [];
      for (var c = 0; c < this._width; ++c) {
        state[r][c] = new PuzzleNode();
        state[r][c].row = r;
        state[r][c].col = c;
        if (this._solution[r][c] == ".") {
          state[r][c].isEmpty = true;
          state[r][c].solution = null;
          state[r][c].solutionIdx = null;
          state[r][c].clues = null;
          continue;
        }

        state[r][c].isEmpty = false;
        state[r][c].solution = ["", ""];
        state[r][c].solutionIdx = [-1, -1];
        state[r][c].clues = ["", ""];

        this._setSolution(state, r, c, ClueType.ACROSS);
        this._setSolution(state, r, c, ClueType.DOWN);
      }
    }

    return state;
  }

  private _setSolution(state: PuzzleNode[][], i: number, j: number, clueType: ClueType): void {
    if (clueType == ClueType.ACROSS) {
      const range: number[] = this._getSolutionRange(i, j, clueType);
      state[i][j].solution[clueType] = this._extractFrom2D(i, range, clueType);
      state[i][j].solutionIdx[clueType] = j - range[0];
    } else {
      const range: number[] = this._getSolutionRange(i, j, clueType);
      state[i][j].solution[clueType] = this._extractFrom2D(j, range, clueType);
      state[i][j].solutionIdx[clueType] = i - range[0];
    }
  }

  private _getSolutionRange(i: number, j: number, clueType: ClueType): number[] {
    if (clueType == ClueType.ACROSS) {
      var start: number = j;
      while (start > 0 && this._solution[i][start - 1] != ".") {
        --start;
      }

      var end: number = j;
      while (end < this._width - 1 && this._solution[i][end + 1] != ".") {
        ++end;
      }
      return [start, end];
    } else {
      var start: number = i;
      while (start > 0 && this._solution[start - 1][j] != ".") {
        --start;
      }

      var end: number = i;
      while (end < this._height - 1 && this._solution[end + 1][j] != ".") {
        ++end;
      }
      return [start, end];
    }
  }

  private _extractFrom2D(i: number, range: number[], clueType: ClueType): string {
    var ans: string = "";
    const start: number = range[0];
    const end: number = range[1];

    if (clueType == ClueType.ACROSS) {
      for (var c = start; c <= end; ++c) {
        ans += this._solution[i][c];
      }
    } else {
      for (var r = start; r <= end; ++r) {
        ans += this._solution[r][i];
      }
    }

    return ans;
  }

  private _setClues(clues: string[]): void {
    var clueIdx = 0;
    for (var r = 0; r < this._height; ++r) {
      for (var c = 0; c < this._width; ++c) {
        if (this._state[r][c].isEmpty) continue;

        if (this._hasLeftBlocked(r, c)) {
          this._state[r][c].clues[ClueType.ACROSS] = clues[clueIdx];
          ++clueIdx;
        } else {
          this._state[r][c].clues[ClueType.ACROSS] = this._state[r][c - 1].clues[ClueType.ACROSS];
        }

        if (this._hasTopBlocked(r, c)) {
          this._state[r][c].clues[ClueType.DOWN] = clues[clueIdx];
          ++clueIdx;
        } else {
          this._state[r][c].clues[ClueType.DOWN] = this._state[r - 1][c].clues[ClueType.DOWN];
        }
      }
    }
  }

  private _hasTopBlocked(x: number, y: number): boolean {
    return x === 0 || this._state[x - 1][y].isEmpty;
  }

  private _hasLeftBlocked(x: number, y: number): boolean {
    return y === 0 || this._state[x][y - 1].isEmpty;
  }
}
