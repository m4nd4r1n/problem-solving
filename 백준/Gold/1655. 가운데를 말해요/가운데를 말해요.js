const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const nums = input.slice(1).map(Number);

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

const minHeap = new PriorityQueue((a, b) => a < b);
const maxHeap = new PriorityQueue((a, b) => a > b);
const result = [];

for (const num of nums) {
  if (maxHeap.size() <= minHeap.size()) maxHeap.push(num);
  else minHeap.push(num);

  if (minHeap.size() !== 0 && minHeap.top() < maxHeap.top()) {
    const max = maxHeap.pop();
    const min = minHeap.pop();
    maxHeap.push(min);
    minHeap.push(max);
  }

  result.push(maxHeap.top());
}

console.log(result.join('\n'));
