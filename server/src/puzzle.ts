import fs from 'fs/promises';

async function readPuzFile(): Promise<string> {
  const puzFilePath = '/home/aneeshd/Projects/MultiPlayerCrossword/server/puzzle/latest.puz';

  try {
    const data = await fs.readFile(puzFilePath, { encoding: 'utf-8' });
    return data;
  } catch(err) {
    console.log(err);
    return "";
  }
}

function getPuzzleSolution(thePuzzle: string): string {
  var solution = takeWhile(thePuzzle.slice(52), c => {
    return /^[A-Z|.]$/.test(c);
  });
  return solution;
}

function takeWhile(str: string, p: (c: string) => Boolean) {
  var taken = "";
  for (var i = 0; i < str.length; ++i) {
    if (p(str.charAt(i))) taken = taken.concat(str.charAt(i));
    else break;
  }
  return taken;
}

class Puzzle {
  thePuzzle: string;
  solution: string;

  constructor(thePuzzle: string) {
    this.thePuzzle = thePuzzle;
    this.solution = getPuzzleSolution(this.thePuzzle);
  }
}

export async function getPuzzle() {
  const thePuzzle = await readPuzFile();
  const puzzle = new Puzzle(thePuzzle);
  return puzzle;
}
