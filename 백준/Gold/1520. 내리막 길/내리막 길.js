const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [M, N] = input[0].split(' ').map(Number);
  const map = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(M, N, map));
});

const solution = (M, N, map) => {
  const dp = Array.from(Array(M), () => Array(N).fill(-1));
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  const dfs = (x, y) => {
    if (x === M - 1 && y === N - 1) return 1;
    if (dp[x][y] !== -1) return dp[x][y];

    dp[x][y] = 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < M && ny >= 0 && ny < N && map[x][y] > map[nx][ny]) {
        dp[x][y] += dfs(nx, ny);
      }
    }

    return dp[x][y];
  };

  return dfs(0, 0);
};
