const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [M, N, H] = input[0].split(' ').map(Number);
  const box = input.slice(1).map((row) => row.split(' ').map(Number));

  console.log(solution(N, M, H, box));
});

const solution = (N, M, H, box) => {
  const dx = [0, 0, 1, -1, 0, 0];
  const dy = [1, -1, 0, 0, 0, 0];
  const dz = [0, 0, 0, 0, 1, -1];
  const queue = new Queue();
  const box3d = Array.from(Array(H), (_, i) => box.slice(i * N, (i + 1) * N));

  for (let z = 0; z < H; z++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (box3d[z][y][x] === 1) queue.push([x, y, z]);
      }
    }
  }

  while (!queue.isEmpty()) {
    const [x, y, z] = queue.pop();

    for (let i = 0; i < 6; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      const nz = z + dz[i];

      if (nx >= 0 && nx < M && ny >= 0 && ny < N && nz >= 0 && nz < H) {
        if (box3d[nz][ny][nx] !== 0) continue;

        box3d[nz][ny][nx] = box3d[z][y][x] + 1;
        queue.push([nx, ny, nz]);
      }
    }
  }

  for (let z = 0; z < H; z++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (box3d[z][y][x] === 0) return -1;
      }
    }
  }

  return Math.max(...box3d.flat(Infinity)) - 1;
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
