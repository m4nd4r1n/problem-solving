function solution(no, works) {
  const totalWorks = works.reduce((sum, work) => sum + work, 0);
  if (totalWorks <= no) return 0;

  const heap = new MaxHeap();
  works.forEach((work) => {
    heap.push(work);
  });

  Array(no)
    .fill(0)
    .forEach(() => {
      heap.push(heap.pop() - 1);
    });

  return heap.heap.reduce((sum, work) => sum + Math.pow(work, 2), 0);
}

class MaxHeap {
  constructor() {
    this.heap = [null];
  }
  push(newValue) {
    this.heap.push(newValue);
    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);

    while (parent && this.heap[parent] < newValue) {
      const tmp = this.heap[parent];
      this.heap[parent] = newValue;
      this.heap[current] = tmp;

      current = parent;
      parent = Math.floor(current / 2);
    }
  }
  pop() {
    if (this.heap.length === 2) return this.heap.pop();

    const top = this.heap[1];
    this.heap[1] = this.heap.pop();

    let current = 1,
      left = 2,
      right = 3;

    const isCurrentSmallerThanLeftOrRight = () =>
      this.heap[current] < this.heap[left] || this.heap[current] < this.heap[right];
    while (isCurrentSmallerThanLeftOrRight()) {
      const tmp = this.heap[current];
      if (this.heap[left] < this.heap[right]) {
        this.heap[current] = this.heap[right];
        this.heap[right] = tmp;
        current = right;
      } else {
        this.heap[current] = this.heap[left];
        this.heap[left] = tmp;
        current = left;
      }
      left = current * 2;
      right = current * 2 + 1;
    }

    return top;
  }
}