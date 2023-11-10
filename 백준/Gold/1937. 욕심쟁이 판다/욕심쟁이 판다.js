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
  const forest = input.slice(1).map((row) => row.split(' ').map(Number));

  console.log(solution(N, forest));
});

const solution = (N, forest) => {
  const dp = Array.from(Array(N), () => Array(N).fill(0));
  const bamboo = Array(N * N);
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  let max = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      bamboo[i * N + j] = [i, j, forest[i][j]];
    }
  }

  bamboo.sort((a, b) => a[2] - b[2]);

  for (let i = N * N - 1; i >= 0; i--) {
    const [x, y] = bamboo[i];

    for (let j = 0; j < 4; j++) {
      const [nx, ny] = [x + dx[j], y + dy[j]];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N || forest[nx][ny] <= forest[x][y]) continue;

      dp[x][y] = Math.max(dp[x][y], dp[nx][ny] + 1);
      max = Math.max(max, dp[x][y]);
    }
  }

  return max + 1;
};
