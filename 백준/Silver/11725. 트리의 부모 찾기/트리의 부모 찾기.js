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
  const edges = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, edges));
});

const solution = (N, edges) => {
  const graph = Array.from(Array(N + 1), () => Array());
  const visited = Array(N + 1).fill(false);
  const parent = Array(N + 1).fill(0);
  const queue = new Queue();

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  queue.push(1);

  while (!queue.isEmpty()) {
    const node = queue.pop();
    visited[node] = true;

    for (const nextNode of graph[node]) {
      if (!visited[nextNode]) {
        queue.push(nextNode);
        parent[nextNode] = node;
      }
    }
  }

  return parent.slice(2).join('\n');
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
    if (this.isEmpty()) return null;
    const item = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return item;
  }

  isEmpty() {
    return this.front === this.rear;
  }
}
