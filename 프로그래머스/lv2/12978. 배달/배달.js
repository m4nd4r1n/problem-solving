function solution(N, road, K) {
  const distances = Array(N + 1).fill(Infinity);
  const pq = new MinHeap();

  distances[1] = 0;
  pq.push({ node: 1, cost: 0 });

  while (!pq.isEmpty()) {
    const { node: current, cost: currentCost } = pq.pop();
    if (distances[current] < currentCost) continue;

    for (const [src, dest, cost] of road) {
      const nextDist = currentCost + cost;
      if (src === current && distances[dest] > nextDist) {
        distances[dest] = nextDist;
        pq.push({ node: dest, cost: nextDist });
      } else if (dest === current && distances[src] > nextDist) {
        distances[src] = nextDist;
        pq.push({ node: src, cost: nextDist });
      }
    }
  }

  return distances.filter((distance) => distance <= K).length;
}

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(newValue) {
    this.heap.push(newValue);
    let current = this.heap.length - 1;
    let parent = Math.floor(current / 2);

    const compare = () => parent !== 0 && this.heap[parent].cost > this.heap[current].cost;

    while (compare()) {
      this._swap(parent, current);
      current = parent;
      parent = Math.floor(current / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return;
    if (this.heap.length === 2) return this.heap.pop();

    const top = this.heap[1];
    this.heap[1] = this.heap.pop();

    let [current, left, right] = [1, 2, 3];

    const isCurrentGreaterThanLeftOrRight = () =>
      (this.heap[left] && this.heap[current].cost > this.heap[left].cost) ||
      (this.heap[right] && this.heap[current].cost > this.heap[right].cost);

    while (isCurrentGreaterThanLeftOrRight()) {
      if (this.heap[left] === undefined) {
        this._swap(current, right);
      } else if (this.heap[right] === undefined) {
        this._swap(current, left);
      } else if (this.heap[left].cost > this.heap[right].cost) {
        this._swap(current, right);
      } else if (this.heap[left].cost <= this.heap[right].cost) {
        this._swap(current, left);
      }
      left = current * 2;
      right = current * 2 + 1;
    }

    return top;
  }

  isEmpty() {
    return this.heap.length === 1;
  }
}