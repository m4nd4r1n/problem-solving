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
  const map = input.slice(1);

  console.log(solution(N, M, map));
});

const WALL = '1';
const ROAD = '0';

const solution = (N, M, map) => {
  const count = Array.from(Array(N), () => Array.from(Array(M), () => Array(2).fill(0)));
  const dr = [1, 0, -1, 0];
  const dc = [0, 1, 0, -1];
  const queue = new Queue();
  count[0][0][0] = 1;
  queue.push([0, 0, 0]);

  while (!queue.isEmpty()) {
    const [row, col, breaked] = queue.pop();
    if (row === N - 1 && col === M - 1) return count[row][col][breaked];

    for (let i = 0; i < 4; i++) {
      const nextRow = row + dr[i];
      const nextCol = col + dc[i];
      if (
        nextRow >= 0 &&
        nextRow < N &&
        nextCol >= 0 &&
        nextCol < M &&
        count[nextRow][nextCol][breaked] === 0
      ) {
        if (map[nextRow][nextCol] === ROAD) {
          count[nextRow][nextCol][breaked] = count[row][col][breaked] + 1;
          queue.push([nextRow, nextCol, breaked]);
        }
        if (map[nextRow][nextCol] === WALL && breaked === 0) {
          count[nextRow][nextCol][1] = count[row][col][0] + 1;
          queue.push([nextRow, nextCol, 1]);
        }
      }
    }
  }
  return -1;
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
