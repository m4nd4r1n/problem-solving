const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, K] = input[0].split(' ').map(Number);
  const values = input.slice(1).map(Number);

  console.log(solution(N, K, values));
});

const solution = (N, K, values) => {
  const dp = Array(K + 1).fill(Infinity);

  dp[0] = 0;

  for (let i = 0; i < N; i++) {
    for (let j = values[i]; j <= K; j++) {
      dp[j] = Math.min(dp[j], dp[j - values[i]] + 1);
    }
  }

  if (dp[K] === Infinity) return -1;
  return dp[K];
};
