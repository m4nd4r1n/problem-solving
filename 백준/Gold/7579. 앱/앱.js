const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [, M] = input[0].split(' ').map(Number);
  const memories = input[1].split(' ').map(Number);
  const costs = input[2].split(' ').map(Number);

  console.log(solution(M, memories, costs));
});

const solution = (M, memories, costs) => {
  const N = memories.length;
  const costSum = costs.reduce((acc, cur) => acc + cur, 0);
  const dp = Array.from(Array(N + 1), () => Array(costSum + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    for (let j = 0; j < costs[i - 1]; j++) {
      dp[i][j] = dp[i - 1][j];
    }
    for (let j = costs[i - 1]; j <= costSum; j++) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - costs[i - 1]] + memories[i - 1]);
    }
  }

  for (let i = 0; i <= costSum; i++) {
    if (dp[N][i] >= M) return i;
  }
};
