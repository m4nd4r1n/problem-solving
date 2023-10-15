const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, L, R] = input[0].split(' ').map(Number);
  const map = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, L, R, map));
});

const solution = (N, L, R, map) => {
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  let count = 0;
  let isMoved = false;

  const bfs = (x, y) => {
    const queue = new Queue();
    const unions = [];
    let sum = 0;

    queue.push([x, y]);
    visited[x][y] = true;

    while (!queue.isEmpty()) {
      const [curX, curY] = queue.pop();
      sum += map[curX][curY];
      unions.push([curX, curY]);

      for (let i = 0; i < 4; i++) {
        const nx = curX + dx[i];
        const ny = curY + dy[i];

        if (nx >= 0 && nx < N && nx >= 0 && ny < N && !visited[nx][ny]) {
          const diff = Math.abs(map[curX][curY] - map[nx][ny]);
          if (diff >= L && diff <= R) {
            queue.push([nx, ny]);
            visited[nx][ny] = true;
          }
        }
      }
    }

    const divide = Math.floor(sum / unions.length);
    for (const [x, y] of unions) {
      map[x][y] = divide;
    }
  };

  while (true) {
    isMoved = false;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let shouldMove = false;
        for (let k = 0; k < 4; k++) {
          const nx = i + dx[k];
          const ny = j + dy[k];

          if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
            const diff = Math.abs(map[i][j] - map[nx][ny]);
            if (diff >= L && diff <= R) {
              shouldMove = true;
              break;
            }
          }
        }
        if (shouldMove && !visited[i][j]) {
          isMoved = true;
          bfs(i, j);
        }
      }
    }
    if (!isMoved) return count;
    for (const row of visited) {
      row.fill(false);
    }
    count += 1;
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
