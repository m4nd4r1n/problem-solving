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

const solution = (N, map) => {
  const depth = Array.from(Array(N), () => Array(N).fill(-1));
  const group = Array.from(Array(N), () => Array(N).fill(0));
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  let answer = Infinity;
  let groupNum = 1;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 1 && group[i][j] === 0) {
        const q = new Queue();
        group[i][j] = groupNum;
        q.push([i, j]);
        while (!q.isEmpty()) {
          const [x, y] = q.pop();
          depth[x][y] = 0;
          for (let k = 0; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];
            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            if (map[nx][ny] === 1 && group[nx][ny] === 0) {
              group[nx][ny] = groupNum;
              q.push([nx, ny]);
            }
          }
        }
        groupNum += 1;
      }
    }
  }

  const q = new Queue();

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 1) {
        q.push([i, j]);
      }
    }
  }

  while (!q.isEmpty()) {
    const [x, y] = q.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (group[nx][ny] === group[x][y]) continue;
      else if (group[nx][ny] === 0) {
        depth[nx][ny] = depth[x][y] + 1;
        group[nx][ny] = group[x][y];
        q.push([nx, ny]);
      } else {
        answer = Math.min(answer, depth[x][y] + depth[nx][ny]);
      }
    }
  }

  return answer;
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
