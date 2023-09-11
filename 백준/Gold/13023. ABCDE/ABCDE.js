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
  const friends = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, M, friends));
});

const solution = (N, M, friends) => {
  const graph = Array.from(Array(N), () => Array());
  let answer = 0;

  for (const [a, b] of friends) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const dfs = (start, depth, visited) => {
    if (depth === 5) {
      answer = 1;
      return;
    }

    for (const next of graph[start]) {
      if (!visited[next]) {
        visited[next] = true;
        dfs(next, depth + 1, visited);
        visited[next] = false;
      }
    }
  };

  for (let i = 0; i < N; i++) {
    const visited = Array(N).fill(false);
    visited[i] = true;
    dfs(i, 1, visited);
    if (answer === 1) break;
  }

  return answer;
};
