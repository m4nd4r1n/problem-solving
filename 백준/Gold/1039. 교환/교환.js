const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const [N, K] = input[0].split(' ');

function solution(N, K) {
  const queue = new Queue();
  queue.push(N);
  for (let i = 0; i < K; i++) {
    const set = new Set();
    const size = queue.size();
    for (let j = 0; j < size; j++) {
      const item = queue.pop();
      if (set.has(item)) continue;
      set.add(item);
      for (let k = 0; k < item.length; k++) {
        for (let l = k + 1; l < item.length; l++) {
          if (k === 0 && item[l] === '0') continue;
          const arr = item.split('');
          [arr[k], arr[l]] = [arr[l], arr[k]];
          queue.push(arr.join(''));
        }
      }
    }
  }
  const max = Math.max(...queue.queue.filter(Boolean));
  if (!isFinite(max)) console.log(-1);
  else console.log(max);
}

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  push(item) {
    this.queue[this.rear++] = item;
  }

  pop() {
    if (this.isEmpty()) return null;
    const item = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return item;
  }

  size() {
    return this.rear - this.front;
  }

  isEmpty() {
    return this.size() === 0;
  }
}

solution(N, parseInt(K));
