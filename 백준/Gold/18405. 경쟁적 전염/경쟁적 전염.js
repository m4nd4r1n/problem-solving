const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, K] = input[0].split(' ').map(Number);
  const grid = input.slice(1, N + 1).map((row) => row.split(' ').map(Number));
  const [S, X, Y] = input[N + 1].split(' ').map(Number);

  console.log(solution(N, K, grid, S, X, Y));
});

const solution = (N, K, grid, S, X, Y) => {
  const viruses = [];
  const queue = new Queue();
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] !== 0) viruses.push([grid[i][j], i, j]);
    }
  }
  viruses
    .sort((a, b) => a[0] - b[0])
    .forEach((virus) => {
      queue.push(virus);
    });

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  Array.from(Array(S)).forEach(() => {
    for (const [virus, x, y] of queue) {
      queue.pop();
      for (let i = 0; i < 4; i++) {
        const nextX = dx[i] + x;
        const nextY = dy[i] + y;
        if (nextX >= 0 && nextX < N && nextY >= 0 && nextY < N && grid[nextX][nextY] === 0) {
          grid[nextX][nextY] = virus;
          queue.push([virus, nextX, nextY]);
        }
      }
    }
  });

  return grid[X - 1][Y - 1];
};

class Queue {
  constructor() {
    this._queue = [];
    this._front = 0;
    this._rear = 0;
  }

  push(value) {
    this._queue[this._rear++] = value;
  }

  pop() {
    const value = this._queue[this._front];
    delete this._queue[this._front];
    this._front += 1;
    return value;
  }

  *[Symbol.iterator]() {
    const start = this._front;
    const end = this._rear;
    for (let i = start; i < end; i++) {
      yield this._queue[i];
    }
  }
}
