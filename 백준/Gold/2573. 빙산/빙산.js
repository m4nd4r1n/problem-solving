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
  const visited = Array.from(Array(N), () => Array(M).fill(false));
  const futureMap = Array.from(Array(N), () => Array(M).fill(0));
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  let year = 0;

  const bfs = (x, y) => {
    const queue = new Queue();
    queue.push([x, y]);
    visited[x][y] = true;

    while (!queue.isEmpty()) {
      const [curX, curY] = queue.pop();

      for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
        if (visited[nx][ny]) continue;

        if (map[nx][ny] !== 0) {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
  };

  const melt = (x, y) => {
    let count = 0;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (map[nx][ny] === 0) count += 1;
    }

    return count;
  };

  const traverse = (callback) => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        callback(i, j);
      }
    }
  };

  while (true) {
    let landCount = 0;

    visited.forEach((v) => v.fill(false));

    traverse((i, j) => {
      if (map[i][j] === 0 || visited[i][j]) return;

      landCount += 1;
      bfs(i, j);
    });

    if (landCount >= 2) return year;
    if (landCount === 0) return 0;

    traverse((i, j) => {
      if (map[i][j] === 0) return;

      futureMap[i][j] = map[i][j] - melt(i, j);
      if (futureMap[i][j] < 0) futureMap[i][j] = 0;
    });

    for (let i = 0; i < N; i++) {
      map[i] = [...futureMap[i]];
    }

    year += 1;
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
