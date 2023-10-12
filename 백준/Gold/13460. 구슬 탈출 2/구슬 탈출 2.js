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
  const board = input.slice(1).map((v) => v.split(''));

  console.log(solution(N, M, board));
});

const WALL = '#';
const HOLE = 'O';
const RED = 'R';
const BLUE = 'B';

const solution = (N, M, board) => {
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  const visited = Array.from(Array(10), () =>
    Array.from(Array(10), () => Array.from(Array(10), () => Array(10).fill(false))),
  );
  const queue = new Queue();
  const red = [0, 0];
  const blue = [0, 0];
  const hole = [0, 0];

  const move = (x, y, dx, dy) => {
    let count = 0;
    while (board[x + dx][y + dy] !== WALL && board[x][y] !== HOLE) {
      x += dx;
      y += dy;
      count += 1;
    }
    return [x, y, count];
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === RED) {
        red[0] = i;
        red[1] = j;
      }
      if (board[i][j] === BLUE) {
        blue[0] = i;
        blue[1] = j;
      }
      if (board[i][j] === HOLE) {
        hole[0] = i;
        hole[1] = j;
      }
    }
  }

  queue.push([red[0], red[1], blue[0], blue[1], 0]);

  while (!queue.isEmpty()) {
    const [rx, ry, bx, by, count] = queue.pop();
    if (count >= 10) return -1;

    for (let i = 0; i < 4; i++) {
      let [nrx, nry, rc] = move(rx, ry, dx[i], dy[i]);
      let [nbx, nby, bc] = move(bx, by, dx[i], dy[i]);

      if (board[nbx][nby] === HOLE) continue;
      if (nrx === hole[0] && nry === hole[1]) return count + 1;
      if (nrx === nbx && nry === nby) {
        if (rc > bc) {
          nrx -= dx[i];
          nry -= dy[i];
        } else {
          nbx -= dx[i];
          nby -= dy[i];
        }
      }
      if (visited[nrx][nry][nbx][nby]) continue;
      visited[nrx][nry][nbx][nby] = true;
      queue.push([nrx, nry, nbx, nby, count + 1]);
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
    delete this.queue[this.front++];
    return item;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}
