const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const [N] = input[0].split(' ').map(Number);
const buildings = input.slice(1).map((str) =>
  str
    .split(' ')
    .map(Number)
    .filter((v) => v !== -1),
);

function solution(N, buildings) {
  /** @type {number[][]} */
  const graph = Array.from(Array(N + 1), () => []);
  const costs = Array(N + 1).fill(0);
  const degree = Array(N + 1).fill(0);
  const result = Array(N + 1).fill(0);
  const queue = new Queue();

  for (const [index, [cost, ...precedings]] of buildings.entries()) {
    costs[index + 1] = cost;
    for (const preceding of precedings) {
      graph[preceding].push(index + 1);
      degree[index + 1] += 1;
    }
  }

  for (let i = 1; i <= N; i++) {
    if (degree[i] === 0) {
      queue.push(i);
      result[i] = costs[i];
    }
  }

  while (!queue.isEmpty()) {
    const current = queue.pop();

    for (const next of graph[current]) {
      result[next] = Math.max(result[next], result[current] + costs[next]);
      degree[next] -= 1;
      if (degree[next] === 0) {
        queue.push(next);
      }
    }
  }

  console.log(result.filter((v) => v !== 0).join('\n'));
}

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

  size() {
    return this.rear - this.front;
  }

  isEmpty() {
    return this.size() === 0;
  }
}

solution(N, buildings);
