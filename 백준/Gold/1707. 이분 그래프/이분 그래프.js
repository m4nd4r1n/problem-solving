const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [K] = input[0].split(' ').map(Number);
  const testCases = [];
  let last = 0;
  for (let i = 0; i < K; i++) {
    const [V, E] = input[last + 1].split(' ').map(Number);
    const edges = input.slice(last + 2, last + E + 2).map((v) => v.split(' ').map(Number));
    testCases.push([V, edges]);
    last += E + 1;
  }
  console.log(solution(testCases));
});

const solution = (testCases) => {
  const results = [];
  for (const [V, edges] of testCases) {
    const graph = Array.from(Array(V + 1), () => Array());
    const depth = Array(V + 1).fill(-1);
    const q = new Queue();
    let isBipartite = true;

    for (const [a, b] of edges) {
      graph[a].push(b);
      graph[b].push(a);
    }

    for (let start = 1; start <= V; start++) {
      if (depth[start] !== -1) continue;
      q.push(start);
      depth[start] = 0;

      while (!q.isEmpty()) {
        const current = q.pop();
        for (const next of graph[current]) {
          if (depth[next] !== -1) continue;
          q.push(next);
          depth[next] = depth[current] + 1;
        }
      }
    }
    for (let i = 1; i <= V; i++) {
      for (const next of graph[i]) {
        if (depth[i] === depth[next]) {
          results.push('NO');
          isBipartite = false;
          break;
        }
      }
      if (!isBipartite) break;
    }
    if (isBipartite) results.push('YES');
  }
  return results.join('\n');
};

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  push(value) {
    this.queue[this.rear++] = value;
  }

  pop() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }

  size() {
    return this.rear - this.front;
  }

  isEmpty() {
    return this.size() === 0;
  }
}
