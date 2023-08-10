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
  const edges = input.slice(1).map((v) => v.split(' ').map(Number));

  solution(N, edges);
});

const solution = (N, edges) => {
  const degree = Array(N + 1).fill(0);
  const graph = Array.from(Array(N + 1), () => Array());
  const queue = new Queue();
  const result = [];

  for (const [a, b] of edges) {
    graph[a].push(b);
    degree[b] += 1;
  }

  for (let i = 1; i <= N; i++) {
    if (degree[i] === 0) queue.push(i);
  }

  while (!queue.isEmpty()) {
    const current = queue.pop();

    result.push(current);

    for (const next of graph[current]) {
      degree[next] -= 1;
      if (degree[next] === 0) queue.push(next);
    }
  }

  console.log(result.join(' '));
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
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}
