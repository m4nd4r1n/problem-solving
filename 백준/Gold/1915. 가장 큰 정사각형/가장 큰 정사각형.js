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
  const box = input.slice(1).map((v) => v.split('').map(Number));

  console.log(solution(N, M, box));
});

const solution = (N, M, box) => {
  const dp = Array.from(Array(N + 1), () => Array(M + 1).fill(0));
  let max = 0;

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      if (box[i - 1][j - 1] === 0) continue;
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      if (dp[i][j] > max) max = dp[i][j];
    }
  }

  return max ** 2;
};
