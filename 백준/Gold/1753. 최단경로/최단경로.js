const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [V] = input[0].split(' ').map(Number);
  const K = Number(input[1]);
  const edges = input.slice(2).map((v) => v.split(' ').map(Number));

  solution(V, K, edges);
});

const solution = (V, start, edges) => {
  const graph = Array.from(Array(V + 1), () => Array());
  const distance = Array(V + 1).fill(Infinity);
  const pq = new PriorityQueue((a, b) => {
    if (!a || !b) return false;
    if (a.cost === b.cost) return a.node < b.node;
    return a.cost < b.cost;
  });
  const result = [];

  for (const [u, v, w] of edges) {
    graph[u].push({ node: v, cost: w });
  }

  distance[start] = 0;
  pq.push({ node: start, cost: 0 });
  while (!pq.isEmpty()) {
    const { node: current, cost } = pq.pop();
    if (distance[current] < cost) continue;
    for (const { node: next, cost: nextCost } of graph[current]) {
      const nextDist = cost + nextCost;
      if (distance[next] > nextDist) {
        distance[next] = nextDist;
        pq.push({ node: next, cost: nextDist });
      }
    }
  }

  for (let i = 1; i <= V; i++) {
    if (distance[i] === Infinity) result.push('INF');
    else result.push(distance[i]);
  }

  console.log(result.join('\n'));
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
      this._swap(current, parent);
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
      const next = this.compare(this.heap[right], this.heap[left]) ? right : left;
      this._swap(current, next);
      current = next;
      left = current * 2;
      right = current * 2 + 1;
    }

    return top;
  }

  isEmpty() {
    return this.heap.length === 1;
  }

  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}
