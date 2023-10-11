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
  const M = Number(input[1]);
  const edges = input.slice(2, M + 2).map((v) => v.split(' ').map(Number));
  const [start, end] = input[M + 2].split(' ').map(Number);

  console.log(solution(N, M, edges, start, end));
});

const solution = (N, M, edges, start, end) => {
  const map = Array.from(Array(N + 1), () => Array(N + 1).fill(Infinity));
  const dist = Array(N + 1).fill(Infinity);
  const pq = new PriorityQueue((a, b) => {
    if (!a || !b) return false;
    if (a[0] === b[0]) return a[1] < b[1];
    return a[0] < b[0];
  });

  for (let i = 1; i <= N; i++) {
    map[i][i] = 0;
  }
  for (const [from, to, cost] of edges) {
    if (map[from][to] > cost) {
      map[from][to] = cost;
    }
  }

  dist[start] = 0;
  pq.push([0, start]);

  while (!pq.isEmpty()) {
    const [cost, from] = pq.pop();

    for (let to = 1; to <= N; to++) {
      if (map[from][to] === Infinity) continue;

      const newCost = cost + map[from][to];

      if (dist[to] > newCost) {
        dist[to] = newCost;
        pq.push([newCost, to]);
      }
    }
  }

  return dist[end];
};

class PriorityQueue {
  constructor(compare) {
    this.heap = [null];
    this.compare = compare;
  }

  push(item) {
    this.heap.push(item);
    let currentNode = this.heap.length - 1;
    let parentNode = Math.floor(currentNode / 2);

    while (parentNode !== 0 && this.compare(this.heap[currentNode], this.heap[parentNode])) {
      this._swap(parentNode, currentNode);
      currentNode = parentNode;
      parentNode = Math.floor(currentNode / 2);
    }
  }

  pop() {
    if (this.heap.length === 1) return;
    if (this.heap.length === 2) return this.heap.pop();

    const top = this.heap[1];
    this.heap[1] = this.heap.pop();

    let [currentNode, leftChild, rightChild] = [1, 2, 3];

    while (
      this.compare(this.heap[leftChild], this.heap[currentNode]) ||
      this.compare(this.heap[rightChild], this.heap[currentNode])
    ) {
      const targetNode = this.compare(this.heap[rightChild], this.heap[leftChild])
        ? rightChild
        : leftChild;
      this._swap(currentNode, targetNode);
      currentNode = targetNode;
      leftChild = currentNode * 2;
      rightChild = currentNode * 2 + 1;
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
