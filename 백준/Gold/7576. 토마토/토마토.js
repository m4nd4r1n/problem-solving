const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [M, N] = input[0].split(' ').map(Number);
  const map = input.slice(1).map((row) => row.split(' ').map(Number));

  console.log(solution(N, M, map));
});

const solution = (N, M, map) => {
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  const queue = new Queue();

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 1) {
        queue.push([i, j]);
      }
    }
  }

  while (!queue.isEmpty()) {
    const [x, y] = queue.pop();

    for (let i = 0; i < 4; i++) {
      const nextX = x + dx[i];
      const nextY = y + dy[i];
      if (nextX >= 0 && nextX < N && nextY >= 0 && nextY < M && map[nextX][nextY] === 0) {
        map[nextX][nextY] = map[x][y] + 1;
        queue.push([nextX, nextY]);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0) {
        return -1;
      }
    }
  }

  return Math.max(...map.flat()) - 1;
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
    delete this.queue[this.front++];
    return item;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}
