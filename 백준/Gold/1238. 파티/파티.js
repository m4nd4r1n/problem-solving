const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, M, X] = input[0].split(' ').map(Number);
  const roads = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, M, X, roads));
});

const solution = (N, M, X, roads) => {
  const graph = Array.from(Array(N + 1), () => Array());
  const reverseGraph = Array.from(Array(N + 1), () => Array());

  for (let i = 0; i < M; i++) {
    const [start, end, cost] = roads[i];
    graph[start].push([cost, end]);
    reverseGraph[end].push([cost, start]);
  }

  const dist = dijkstra(graph, X, N);
  const reverseDist = dijkstra(reverseGraph, X, N);

  let max = 0;
  for (let i = 1; i <= N; i++) {
    max = Math.max(max, dist[i] + reverseDist[i]);
  }

  return max;
};

const dijkstra = (graph, start, N) => {
  const dist = Array(N + 1).fill(Infinity);
  const pq = new PriorityQueue((a, b) => {
    if (!a || !b) return false;
    if (a[0] === b[0]) return a[1] < b[1];
    return a[0] < b[0];
  });

  dist[start] = 0;
  pq.push([0, start]);

  while (!pq.isEmpty()) {
    const [cost, current] = pq.pop();

    if (dist[current] < cost) continue;

    for (const [nextCost, next] of graph[current]) {
      const nextDist = cost + nextCost;
      if (dist[next] > nextDist) {
        dist[next] = nextDist;
        pq.push([nextDist, next]);
      }
    }
  }

  return dist;
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
