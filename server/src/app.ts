import { Puzzle } from "./puzzle";
import express from "express";

const puzFilePath =
  "/home/aneeshd/Projects/MultiPlayerCrossword/server/puzzle/latest.puz";
const puzzle: Puzzle = new Puzzle(puzFilePath);

const app = express();
const port: number = 4000;

app.get("/", (_, res) => {
  res.send("Connected to server!");
  console.log(puzzle.height + " " + puzzle.width);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
