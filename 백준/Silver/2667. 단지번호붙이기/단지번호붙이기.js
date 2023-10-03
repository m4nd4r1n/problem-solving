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
  const map = input.slice(1).map((row) => row.split('').map(Number));

  console.log(solution(N, map));
});

const solution = (N, map) => {
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  const queue = new Queue();
  const visited = Array.from(new Array(N), () => new Array(N).fill(false));

  const result = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 1 && !visited[i][j]) {
        let count = 1;
        queue.push([i, j]);
        visited[i][j] = true;

        while (!queue.isEmpty()) {
          const [x, y] = queue.pop();

          for (let k = 0; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];

            if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny] && map[nx][ny] === 1) {
              queue.push([nx, ny]);
              visited[nx][ny] = true;
              count += 1;
            }
          }
        }
        result.push(count);
      }
    }
  }

  return `${result.length}\n${result.sort((a, b) => a - b).join('\n')}`;
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
