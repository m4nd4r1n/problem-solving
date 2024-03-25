const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const N = Number(input[0]);
  const corridor = input.slice(1).map((row) => row.split(' '));

  console.log(solution(N, corridor));
});

const STUDENT = 'S';
const TEACHER = 'T';
const EMPTY = 'X';
const OBSTACLE = 'O';

const solution = (N, corridor) => {
  const teachers = [];
  const empties = [];
  let result = 'NO';

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (corridor[i][j] === TEACHER) teachers.push([i, j]);
      else if (corridor[i][j] === EMPTY) empties.push([i, j]);
    }
  }

  const find = (obstacles) => {
    if (obstacles === 3) {
      if (isAllHide(teachers, corridor)) result = 'YES';
      return;
    }

    for (const [x, y] of empties) {
      if (corridor[x][y] === EMPTY) {
        corridor[x][y] = OBSTACLE;
        find(obstacles + 1);
        corridor[x][y] = EMPTY;
      }
    }
  };

  find(0);

  return result;
};

const isAllHide = (teachers, corridor) => {
  const N = corridor.length;
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  for (const [x, y] of teachers) {
    for (let i = 0; i < 4; i++) {
      let nextX = x + dx[i];
      let nextY = y + dy[i];

      while (
        nextX >= 0 &&
        nextX < N &&
        nextY >= 0 &&
        nextY < N &&
        corridor[nextX][nextY] !== OBSTACLE
      ) {
        if (corridor[nextX][nextY] === STUDENT) return false;
        nextX += dx[i];
        nextY += dy[i];
      }
    }
  }

  return true;
};
