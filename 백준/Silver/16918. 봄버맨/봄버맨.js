const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [R, C, N] = input[0].split(' ').map(Number);
  const grid = input.slice(1);

  console.log(solution(R, C, N, grid));
});

const EMPTY = -1;
const BOMB_TO_EXPLODE = 0;
const INIT_BOMB_COUNT = 2;
const MAX_BOMB_COUNT = 3;

const solution = (R, C, N, grid) => {
  const numberGrid = grid.map((row) =>
    row.split('').map((cell) => (cell === '.' ? EMPTY : INIT_BOMB_COUNT)),
  );

  Array.from(Array(N + 1)).forEach((_, sec) => {
    if (sec === 0 || sec === 1) return;

    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        if (numberGrid[i][j] !== EMPTY) numberGrid[i][j] -= 1;
      }
    }

    const step = sec % 2;

    if (step === 0) {
      for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
          if (numberGrid[i][j] === EMPTY) numberGrid[i][j] = MAX_BOMB_COUNT;
        }
      }
      return;
    }

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        if (numberGrid[i][j] !== BOMB_TO_EXPLODE) continue;

        numberGrid[i][j] = EMPTY;
        for (let k = 0; k < 4; k++) {
          const x = dx[k] + i;
          const y = dy[k] + j;
          if (x >= 0 && x < R && y >= 0 && y < C && numberGrid[x][y] !== BOMB_TO_EXPLODE) {
            numberGrid[x][y] = EMPTY;
          }
        }
      }
    }
  });

  return numberGrid
    .map((row) => row.map((cell) => (cell === EMPTY ? '.' : 'O')).join(''))
    .join('\n');
};
