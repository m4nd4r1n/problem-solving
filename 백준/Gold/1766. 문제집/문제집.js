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
  const problems = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, problems));
});

const solution = (N, problems) => {
  const pq = new PriorityQueue((a, b) => a < b);
  const graph = Array.from(Array(N + 1), () => Array());
  const done = Array(N + 1).fill(0);
  const result = [];

  for (const [a, b] of problems) {
    graph[a].push(b);
    done[b] += 1;
  }

  for (let i = 1; i <= N; i++) {
    if (done[i] === 0) pq.push(i);
  }

  while (!pq.isEmpty()) {
    const problem = pq.pop();
    result.push(problem);

    const nextProblems = graph[problem];
    for (const nextProblem of nextProblems) {
      done[nextProblem] -= 1;
      if (done[nextProblem] === 0) pq.push(nextProblem);
    }
  }

  return result.join(' ');
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
