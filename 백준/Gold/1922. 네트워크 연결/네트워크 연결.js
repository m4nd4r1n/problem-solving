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
  const computers = input.slice(2).map((v) => v.split(' ').map(Number));

  solution(N, computers);
});

const solution = (N, computers) => {
  const graph = Array.from(Array(N + 1), () => Array());
  const visited = Array(N + 1).fill(false);
  const pq = new PriorityQueue((a, b) => {
    if (!a || !b) return false;
    if (a[0] === b[0]) return a[1] < b[1];
    return a[0] < b[0];
  });

  for (const [a, b, c] of computers) {
    graph[a].push([c, b]);
    graph[b].push([c, a]);
  }

  pq.push([0, 1]);
  let result = 0;
  while (!pq.isEmpty()) {
    const [cost, node] = pq.pop();
    if (!visited[node]) {
      visited[node] = true;
      result += cost;
      for (const [nextCost, nextNode] of graph[node]) {
        if (!visited[nextNode]) pq.push([nextCost, nextNode]);
      }
    }
  }

  console.log(result);
};

class PriorityQueue {
  constructor(compare) {
    this.heap = [null];
    this.compare = compare;
  }

  push(item) {
    this.heap.push(item);
    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);

    while (parent !== 0 && this.compare(this.heap[current], this.heap[parent])) {
      this._swap(parent, current);
      current = parent;
      parent = Math.floor(current / 2);
    }
  }

  pop() {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) return this.heap.pop();

    const top = this.heap[1];
    this.heap[1] = this.heap.pop();

    let [current, left, right] = [1, 2, 3];

    while (
      this.compare(this.heap[left], this.heap[current]) ||
      this.compare(this.heap[right], this.heap[current])
    ) {
      const topIndex = this.compare(this.heap[right], this.heap[left]) ? right : left;
      this._swap(current, topIndex);
      current = topIndex;
      left = current * 2;
      right = current * 2 + 1;
    }

    return top;
  }

  size() {
    return this.heap.length - 1;
  }

  top() {
    return this.heap[1];
  }

  isEmpty() {
    return this.heap.length === 1;
  }

  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}
