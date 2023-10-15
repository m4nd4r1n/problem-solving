const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N] = input[0].split(' ').map(Number);
  const map = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, map));
});

const EMPTY = 0;
const SHARK = 9;

const solution = (N, map) => {
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  let eatCount = 0;
  let sharkSize = 2;
  let time = 0;
  let sharkX = 0;
  let sharkY = 0;
  let ate = false;

  const bfs = (x, y) => {
    const q = new Queue();
    let timeTakenToEat = 0;
    q.push([x, y, 0]);
    visited[x][y] = true;

    while (!q.isEmpty()) {
      const [cx, cy, ct] = q.pop();

      if (
        map[cx][cy] !== EMPTY &&
        map[cx][cy] < sharkSize &&
        timeTakenToEat === ct &&
        (sharkX > cx || (sharkX === cx && sharkY > cy))
      ) {
        sharkX = cx;
        sharkY = cy;
        continue;
      }

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        if (visited[nx][ny] || map[nx][ny] > sharkSize) continue;

        if (map[nx][ny] !== EMPTY && map[nx][ny] < sharkSize && !ate) {
          ate = true;
          sharkX = nx;
          sharkY = ny;
          timeTakenToEat = ct + 1;
          time += timeTakenToEat;
          continue;
        }

        visited[nx][ny] = true;
        q.push([nx, ny, ct + 1]);
      }
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === SHARK) {
        sharkX = i;
        sharkY = j;
        map[i][j] = EMPTY;
      }
    }
  }

  while (true) {
    bfs(sharkX, sharkY);
    if (!ate) return time;

    ate = false;
    eatCount += 1;
    map[sharkX][sharkY] = EMPTY;
    if (eatCount === sharkSize) {
      sharkSize += 1;
      eatCount = 0;
    }
    visited.forEach((v) => v.fill(false));
  }
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
