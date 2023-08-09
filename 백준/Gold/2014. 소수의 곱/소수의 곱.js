const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [, N] = input[0].split(' ').map(Number);
  const primes = input[1].split(' ').map(Number);

  solution(N, primes);
});

const solution = (N, primes) => {
  const pq = new PriorityQueue((a, b) => a < b);

  for (const prime of primes) {
    pq.push(prime);
  }

  for (let i = 0; i < N - 1; i++) {
    const num = pq.pop();
    for (const prime of primes) {
      pq.push(num * prime);
      if (num % prime === 0) break;
    }
  }

  console.log(pq.top());
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

  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}
