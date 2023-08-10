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
  const map = input.slice(1).map((v) => v.split(' ').map(Number));

  solution(N, M, map);
});

const BLANK = 0;
const WALL = 1;
const VIRUS = 2;

const solution = (N, M, map) => {
  const dr = [1, 0, -1, 0];
  const dc = [0, 1, 0, -1];
  let result = 0;

  const setWall = (count) => {
    if (count === 3) {
      bfs();
      return;
    }
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === BLANK) {
          map[i][j] = WALL;
          setWall(count + 1);
          map[i][j] = BLANK;
        }
      }
    }
  };

  const bfs = () => {
    const queue = new Queue();

    const copiedMap = Array.from(Array(N), () => Array(M).fill(0));
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        copiedMap[i][j] = map[i][j];
        if (copiedMap[i][j] === VIRUS) queue.push([i, j]);
      }
    }

    while (!queue.isEmpty()) {
      const [row, col] = queue.pop();

      for (let i = 0; i < 4; i++) {
        const nextRow = row + dr[i];
        const nextCol = col + dc[i];
        if (
          nextRow >= 0 &&
          nextRow < N &&
          nextCol >= 0 &&
          nextCol < M &&
          copiedMap[nextRow][nextCol] === BLANK
        ) {
          copiedMap[nextRow][nextCol] = VIRUS;
          queue.push([nextRow, nextCol]);
        }
      }
    }

    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copiedMap[i][j] === BLANK) count += 1;
      }
    }

    result = Math.max(result, count);
  };

  setWall(0);

  console.log(result);
};

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  push(item) {
    this.queue[this.rear++] = item;
  }

  pop() {
    const item = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return item;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}
