const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [R, C] = input[0].split(' ').map(Number);
  const map = input.slice(1).map((row) => row.split(''));

  console.log(solution(R, C, map));
});

const WATER = '*';
const DEST = 'D';
const START = 'S';
const EMPTY = '.';

const solution = (R, C, map) => {
  const waterQ = new Queue();
  const hedgeQ = new Queue();
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  let destR = 0;
  let destC = 0;
  let time = 0;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (map[i][j] === START) hedgeQ.push([i, j]);
      if (map[i][j] === WATER) waterQ.push([i, j]);
      if (map[i][j] === DEST) {
        destR = i;
        destC = j;
      }
    }
  }

  while (!hedgeQ.isEmpty()) {
    const waterCount = waterQ.size();
    for (let i = 0; i < waterCount; i++) {
      const [wr, wc] = waterQ.pop();
      for (let i = 0; i < 4; i++) {
        const nwr = dr[i] + wr;
        const nwc = dc[i] + wc;
        if (nwr < 0 || nwr >= R || nwc < 0 || nwc >= C || map[nwr][nwc] !== EMPTY) continue;
        map[nwr][nwc] = WATER;
        waterQ.push([nwr, nwc]);
      }
    }

    const hedgeCount = hedgeQ.size();
    for (let i = 0; i < hedgeCount; i++) {
      const [hr, hc] = hedgeQ.pop();
      for (let i = 0; i < 4; i++) {
        const nhr = dr[i] + hr;
        const nhc = dc[i] + hc;
        if (nhr === destR && nhc === destC) return time + 1;
        if (nhr < 0 || nhr >= R || nhc < 0 || nhc >= C || map[nhr][nhc] !== EMPTY) continue;
        map[nhr][nhc] = START;
        hedgeQ.push([nhr, nhc]);
      }
    }

    time += 1;
  }
  return 'KAKTUS';
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

  size() {
    return this.rear - this.front;
  }
}
