const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const office = input.slice(1).map((v) => v.split(' '));

  console.log(solution(N, M, office));
});

const EMPTY = '0';
const WALL = '6';
const OBSERVED = '#';

const solution = (N, M, office) => {
  const cctv = [];
  let min = Infinity;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++)
      if (office[i][j] !== EMPTY && office[i][j] !== WALL) cctv.push([i, j, office[i][j]]);
  }

  const dfs = (office, idx) => {
    if (idx === cctv.length) {
      let cnt = 0;
      for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) if (office[i][j] === EMPTY) cnt++;
      min = Math.min(min, cnt);
      return;
    }

    const [x, y, type] = cctv[idx];
    const directions = directionMap[type]();

    for (const direction of directions) {
      const copy = office.map((v) => [...v]);
      for (const [dx, dy] of direction) {
        let nextX = x + dx;
        let nextY = y + dy;

        while (nextX >= 0 && nextX < N && nextY >= 0 && nextY < M) {
          if (copy[nextX][nextY] === WALL) break;
          if (copy[nextX][nextY] === EMPTY) copy[nextX][nextY] = OBSERVED;
          nextX += dx;
          nextY += dy;
        }
      }
      dfs(copy, idx + 1);
    }
  };

  dfs(office, 0);

  return min;
};

const directionMap = {
  1: () => [[[0, 1]], [[0, -1]], [[1, 0]], [[-1, 0]]],
  2: () => [
    [
      [0, 1],
      [0, -1],
    ],
    [
      [1, 0],
      [-1, 0],
    ],
  ],
  3: () => [
    [
      [0, 1],
      [1, 0],
    ],
    [
      [0, 1],
      [-1, 0],
    ],
    [
      [0, -1],
      [1, 0],
    ],
    [
      [0, -1],
      [-1, 0],
    ],
  ],
  4: () => [
    [
      [0, 1],
      [0, -1],
      [1, 0],
    ],
    [
      [0, 1],
      [0, -1],
      [-1, 0],
    ],
    [
      [0, 1],
      [1, 0],
      [-1, 0],
    ],
    [
      [0, -1],
      [1, 0],
      [-1, 0],
    ],
  ],
  5: () => [
    [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ],
  ],
};
