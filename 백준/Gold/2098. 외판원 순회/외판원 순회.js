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
  const W = input.slice(1).map((row) =>
    row.split(' ').map((w) => {
      const num = Number(w);
      return num === 0 ? Infinity : num;
    }),
  );

  console.log(solution(N, W));
});

const solution = (N, W) => {
  const ALL_VISITED = (1 << N) - 1;
  const D = Array.from(Array(N), () => Array(1 << N).fill(0));

  const dfs = (current, visited) => {
    if (visited === ALL_VISITED) return W[current][0] || Infinity;

    if (D[current][visited]) return D[current][visited];

    D[current][visited] = Infinity;

    for (let next = 0; next < N; next++) {
      if (visited & (1 << next) || W[current][next] === Infinity) continue;

      D[current][visited] = Math.min(
        D[current][visited],
        dfs(next, visited | (1 << next)) + W[current][next],
      );
    }

    return D[current][visited];
  };

  return dfs(0, 1);
};
