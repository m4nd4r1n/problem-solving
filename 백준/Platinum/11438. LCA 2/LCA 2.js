const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const N = Number(input[0]);
  const edges = input.slice(1, N).map((v) => v.split(' ').map(Number));
  const M = Number(input[N]);
  const nodes = input.slice(N + 1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, M, edges, nodes));
});

const solution = (N, M, edges, nodes) => {
  const graph = Array.from(Array(N + 1), () => Array());
  const depths = Array(N + 1).fill(0);
  const parents = Array.from(Array(20), () => Array(N + 1).fill(0));
  const result = [];
  let H = 0;

  const dfs = (parent, node, depth) => {
    if (!graph[node].length) return;
    depths[node] = depth;
    parents[0][node] = parent;
    for (const next of graph[node]) {
      if (next !== parent) dfs(node, next, depth + 1);
    }
  };

  const lca = (a, b) => {
    if (depths[a] !== depths[b]) {
      if (depths[a] < depths[b]) [a, b] = [b, a];
      let diff = depths[a] - depths[b];
      for (let i = 0; diff > 0; i++) {
        if (diff % 2) a = parents[i][a];
        diff >>= 1;
      }
    }
    if (a !== b) {
      for (let i = H; i >= 0; i--) {
        if (parents[i][a] && parents[i][a] !== parents[i][b]) {
          a = parents[i][a];
          b = parents[i][b];
        }
      }
      a = parents[0][a];
    }
    return a;
  };

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  dfs(0, 1, 0);

  let n = N;
  while (n > 1) {
    n >>= 1;
    H += 1;
  }
  for (let i = 1; i <= H; i++) {
    for (let j = 2; j <= N; j++) {
      parents[i][j] = parents[i - 1][parents[i - 1][j]];
    }
  }
  for (const [a, b] of nodes) {
    result.push(lca(a, b));
  }

  return result.join('\n');
};
