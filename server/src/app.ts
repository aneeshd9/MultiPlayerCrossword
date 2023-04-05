import express from 'express';
import { getPuzzle } from './puzzle';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Connected to puzzle server!');
});

app.get('/puzzle/solution', async (_, res) => {
  const puzzle = await getPuzzle();
  res.send(puzzle.solution);
});

app.listen(port, () => {
  console.log(`Express is listening at https://localhost:${port}`);
});

