const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N] = input[0].split(' ').map(Number);
  const edges = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, edges));
});

const solution = (N, edges) => {
  const dist = Array(N + 1).fill(-1);
  const children = Array.from(Array(N + 1), () => Array());
  let max = 0;

  const dfs = (node) => {
    let firstDist = -1;
    let secondDist = -1;

    dist[node] = 0;

    for (const [child, weight] of children[node]) {
      if (dist[child] === -1) dfs(child, dist, children);

      const currentDist = dist[child] + weight;
      dist[node] = Math.max(dist[node], currentDist);
      if (firstDist < currentDist) {
        secondDist = firstDist;
        firstDist = currentDist;
      } else if (secondDist < currentDist) secondDist = currentDist;
    }
    if (secondDist !== -1) max = Math.max(max, firstDist + secondDist);
  };

  for (const [parent, child, weight] of edges) {
    children[parent].push([child, weight]);
  }

  dfs(1);

  for (let i = 1; i <= N; i++) {
    max = Math.max(max, dist[i]);
  }

  return max;
};
