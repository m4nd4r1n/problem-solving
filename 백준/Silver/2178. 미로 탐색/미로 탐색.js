const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [N, M] = input[0].split(" ").map(Number);
  const map = input.slice(1).map((row) => row.split("").map(Number));

  console.log(solution(N, M, map));
});

const solution = (N, M, map) => {
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  const queue = new Queue();
  const visited = Array.from(Array(N), () => Array(M).fill(false));

  queue.push([0, 0]);
  visited[0][0] = true;

  while (!queue.isEmpty()) {
    const [x, y] = queue.pop();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        if (visited[nx][ny] || map[nx][ny] === 0) continue;

        queue.push([nx, ny]);
        visited[nx][ny] = true;
        map[nx][ny] = map[x][y] + 1;
      }
    }
  }

  return map[N - 1][M - 1];
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
