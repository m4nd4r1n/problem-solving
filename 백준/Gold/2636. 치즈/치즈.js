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

  console.log(solution(N, M, map));
});

const solution = (N, M, map) => {
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  let time = 0;
  let result = 0;

  while (true) {
    const visited = Array.from(Array(N), () => Array(M).fill(false));
    const q = new Queue();
    let count = 0;

    q.push([0, 0]);
    visited[0][0] = true;

    while (!q.isEmpty()) {
      const [x, y] = q.pop();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M || visited[nx][ny]) continue;
        if (map[nx][ny] === 0) {
          q.push([nx, ny]);
        } else {
          map[nx][ny] = 0;
          count += 1;
        }
        visited[nx][ny] = true;
      }
    }

    if (count === 0) {
      return `${time}\n${result}`;
    }

    time += 1;
    result = count;
  }
};

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  push(value) {
    this.queue[this.rear++] = value;
  }

  pop() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }

  size() {
    return this.rear - this.front;
  }

  isEmpty() {
    return this.size() === 0;
  }
}
