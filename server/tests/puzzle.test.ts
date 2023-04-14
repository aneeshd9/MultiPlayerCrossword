import { ClueType, Puzzle } from "../src/puzzle";

const puzFilePath =
  "/home/aneeshd/Projects/MultiPlayerCrossword/server/tests/assets/test.puz";
const puzzle = new Puzzle(puzFilePath);

describe("parsed puzzle", () => {
  it("should have correct width", () => {
    expect(puzzle.width).toBe(15);
  });

  it("should have correct height", () => {
    expect(puzzle.height).toBe(15);
  });

  

  it("should have correct state/solution", () => {
    expect(puzzle.solution(0, 0, ClueType.ACROSS)).toBe("TEA");
    expect(puzzle.solution(0, 0, ClueType.DOWN)).toBe("TAG");
    expect(puzzle.solution(1, 9, ClueType.ACROSS)).toBe("PANERA");
    expect(puzzle.solution(1, 9, ClueType.DOWN)).toBe("POLISHERS");
    expect(puzzle.solution(3, 2, ClueType.ACROSS)).toBe("CCS");
    expect(puzzle.solution(3, 2, ClueType.DOWN)).toBe("ACTCASUAL");
    expect(puzzle.solution(9, 4, ClueType.ACROSS)).toBe("LAOS");
    expect(puzzle.solution(9, 4, ClueType.DOWN)).toBe("ADMIRE");
  });

it("should have correct state/solutionIdx", () => {
    for (var r = 0; r < puzzle.height; ++r) {
      for (var c = 0; c < puzzle.width; ++c) {
        if (puzzle.isEmpty(r, c)) continue;
        const acrossSolution = puzzle.solution(r, c, ClueType.ACROSS);
        const downSolution = puzzle.solution(r, c, ClueType.DOWN);
        const acrossSolutionIdx = puzzle.solutionIdx(r, c, ClueType.ACROSS);
        const downSolutionIdx = puzzle.solutionIdx(r, c, ClueType.DOWN);

        expect(acrossSolution.at(acrossSolutionIdx)).toEqual(
          downSolution.at(downSolutionIdx)
        );
      }
    }
  });
});
