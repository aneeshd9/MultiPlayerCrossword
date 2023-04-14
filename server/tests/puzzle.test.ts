import { Puzzle } from "../src/puzzle";

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
});
