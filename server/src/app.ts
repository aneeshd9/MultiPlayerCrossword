import express from "express";
import { parsePuzFile } from "./puzzle";

const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.send("Connected to puzzle server!");
});

app.get("/puzzle", (_, res) => {
  const puzzle = parsePuzFile(
    "/home/aneeshd/Projects/MultiPlayerCrossword/server/puzzle/latest2.puz"
  );
  console.log(puzzle);
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Express is listening at https://localhost:${port}`);
});
