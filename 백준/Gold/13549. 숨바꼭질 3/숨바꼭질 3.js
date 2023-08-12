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

  console.log(solution(N, K));
});

const MAX = 100_000;

const solution = (N, K) => {
  const pq = new PriorityQueue((a, b) => {
    if (!a || !b) return false;
    if (a[0] === b[0]) return a[1] < b[1];
    return a[0] < b[0];
  });
  const visited = Array(MAX + 1).fill(false);

  pq.push([0, N]);

  while (!pq.isEmpty()) {
    const [time, current] = pq.pop();
    visited[current] = true;
    if (current === K) return time;
    if (current * 2 <= MAX && !visited[current * 2]) pq.push([time, current * 2]);
    if (current + 1 <= MAX && !visited[current + 1]) pq.push([time + 1, current + 1]);
    if (current - 1 >= 0 && !visited[current - 1]) pq.push([time + 1, current - 1]);
  }
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

    const item = this.heap[1];
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

    return item;
  }

  isEmpty() {
    return this.heap.length === 1;
  }

  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}
