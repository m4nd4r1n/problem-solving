const solution = (n, wires) =>
  Array(n - 1)
    .fill()
    .reduce((diff, _, index) => {
      const graph = Object.entries(
        wires
          .filter((_, idx) => idx !== index)
          .reduce((graph, edge) => {
            const [first, second] = edge;
            if (graph[first]) graph[first].push(second);
            else graph[first] = [second];
            if (graph[second]) graph[second].push(first);
            else graph[second] = [first];
            return graph;
          }, {})
      );
      const towerCount = bfs(graph);
      const result = Math.abs(2 * towerCount - n);
      return diff > result ? result : diff;
    }, Infinity);

const bfs = (graph) => {
  const visited = [];
  const queue = [graph[0]];
  let count = 0;
  while (queue.length) {
    const [node, adjacent] = queue.shift();
    if (!visited.includes(+node)) {
      visited.push(+node);
      count += 1;
    }
    adjacent.forEach((node) => {
      if (!visited.includes(+node)) {
        queue.push(graph.find(([target]) => +target === node));
      }
    });
  }
  return count;
};