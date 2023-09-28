const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const N = Number(input[0]);
  const picture = input.slice(1).map((row) => row.split(''));

  console.log(solution(N, picture));
});

const solution = (N, picture) => {
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  const colorWeaknessPicture = picture.map((row) =>
    row.map((color) => (color === 'B' ? color : 'X')),
  );
  const colorWeaknessVisited = Array.from(Array(N), () => Array(N).fill(false));
  let normal = 0;
  let colorWeakness = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        bfs(N, picture, visited, i, j);
        normal += 1;
      }
      if (!colorWeaknessVisited[i][j]) {
        bfs(N, colorWeaknessPicture, colorWeaknessVisited, i, j);
        colorWeakness += 1;
      }
    }
  }

  return `${normal} ${colorWeakness}`;
};

const bfs = (N, picture, visited, startX, startY) => {
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  const queue = new Queue();
  const color = picture[startX][startY];
  queue.push([startX, startY]);
  visited[startX][startY] = true;

  while (!queue.isEmpty()) {
    const [x, y] = queue.pop();

    for (let i = 0; i < 4; i++) {
      const nextX = x + dx[i];
      const nextY = y + dy[i];
      if (
        nextX >= 0 &&
        nextX < N &&
        nextY >= 0 &&
        nextY < N &&
        !visited[nextX][nextY] &&
        picture[nextX][nextY] === color
      ) {
        visited[nextX][nextY] = true;
        queue.push([nextX, nextY]);
      }
    }
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
