function solution(n, edges) {
  const graph = Array.from(Array(n+1), () => [])
  edges.forEach(([a,b]) => {
    graph[a].push(b)
    graph[b].push(a)
  })
  const distances = Array(n+1).fill(0)

  const queue = [1]
  distances[1] = 1
  while (queue.length) {
    const current = queue.shift();
    graph[current].forEach((next) => {
      if (distances[next] === 0) {
        distances[next] = distances[current] + 1;
        queue.push(next);
      }
    });
  }

  const max = Math.max(...distances);
  return distances.filter((distance) => distance === max).length;
}