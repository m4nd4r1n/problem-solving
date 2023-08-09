const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, M, K] = input[0].split(' ').map(Number);
  const numbers = input.slice(1, N + 1).map(BigInt);
  const operations = input.slice(N + 1, N + M + K + 1).map((v) => v.split(' ').map(Number));

  solution(numbers, operations);
});

const solution = (numbers, operations) => {
  const segTree = new SegmentTree(numbers);
  const N = numbers.length;
  const result = [];

  segTree.init(1, 0, N - 1);

  for (const [a, b, c] of operations) {
    if (a === 1) {
      segTree.update(b - 1, BigInt(c));
    } else {
      result.push(segTree.sum(1, 0, N - 1, b - 1, c - 1));
    }
  }

  console.log(result.join('\n'));
};

class SegmentTree {
  constructor(numbers) {
    this.tree = Array(1 << Math.ceil(Math.log2(numbers.length) + 1)).fill(0n);
    this.numbers = numbers;
  }

  init(node, start, end) {
    if (start === end) return (this.tree[node] = this.numbers[start]);

    const mid = Math.floor((start + end) / 2);
    return (this.tree[node] =
      this.init(node * 2, start, mid) + this.init(node * 2 + 1, mid + 1, end));
  }

  sum(node, start, end, left, right) {
    if (left > end || right < start) return 0n;
    if (left <= start && end <= right) return this.tree[node];

    const mid = Math.floor((start + end) / 2);
    return (
      this.sum(node * 2, start, mid, left, right) +
      this.sum(node * 2 + 1, mid + 1, end, left, right)
    );
  }

  updateRecursive(node, start, end, index, diff) {
    if (index < start || index > end) return;

    this.tree[node] += diff;

    if (start === end) return;

    const mid = Math.floor((start + end) / 2);
    this.updateRecursive(node * 2, start, mid, index, diff);
    this.updateRecursive(node * 2 + 1, mid + 1, end, index, diff);
  }

  update(index, value) {
    const diff = value - this.numbers[index];
    this.numbers[index] = value;
    this.updateRecursive(1, 0, this.numbers.length - 1, index, diff);
  }
}
