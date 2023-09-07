const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const heights = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, M, heights));
});

const solution = (N, M, heights) => {
  const forward = Array.from(Array(N + 1), () => Array());
  const backward = Array.from(Array(N + 1), () => Array());
  const visited = Array(N + 1).fill(false);
  let count = 0;
  let answer = 0;

  for (const [a, b] of heights) {
    forward[a].push(b);
    backward[b].push(a);
  }

  const dfs = (graph, current) => {
    visited[current] = true;

    for (const next of graph[current]) {
      if (visited[next]) continue;
      count += 1;
      dfs(graph, next);
    }
  };

  for (let i = 1; i <= N; i++) {
    count = 0;
    visited.fill(false);
    dfs(forward, i);
    visited.fill(false);
    dfs(backward, i);

    if (count === N - 1) answer += 1;
  }

  return answer;
};
