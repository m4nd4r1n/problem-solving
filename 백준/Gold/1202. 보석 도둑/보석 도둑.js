const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, K] = input[0].split(' ').map(Number);
  const gems = input.slice(1, N + 1).map((v) => v.split(' ').map(Number));
  const bags = input.slice(N + 1).map(Number);

  console.log(solution(N, K, gems, bags));
});

const solution = (N, K, gems, bags) => {
  const pq = new PriorityQueue((a, b) => a > b);

  let result = 0;
  let index = 0;

  gems.sort((a, b) => a[0] - b[0]);
  bags.sort((a, b) => a - b);

  for (const bag of bags) {
    while (index < N && gems[index][0] <= bag) {
      pq.push(gems[index][1]);
      index += 1;
    }
    if (!pq.isEmpty()) {
      result += pq.pop();
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
