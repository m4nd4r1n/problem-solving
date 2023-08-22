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
  const edges = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(V, edges));
});

const solution = (V, edges) => {
  const graph = Array.from(Array(V + 1), () => Array());
  const visited = Array(V + 1).fill(false);
  const pq = new PriorityQueue((a, b) => {
    if (!a || !b) return false;
    if (a[0] === b[0]) return a[1] < b[1];
    return a[0] < b[0];
  });

  for (const [from, to, cost] of edges) {
    graph[from].push([cost, to]);
    graph[to].push([cost, from]);
  }

  pq.push([0, 1]);
  let result = 0;
  while (!pq.isEmpty()) {
    const [cost, current] = pq.pop();
    if (visited[current]) continue;
    visited[current] = true;
    result += cost;
    for (const [nextCost, next] of graph[current]) {
      if (!visited[next]) pq.push([nextCost, next]);
    }
  }

  return result;
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
      const targetNode = this.compare(this.heap[rightChild], this.heap[leftChild]) ? rightChild : leftChild;
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
