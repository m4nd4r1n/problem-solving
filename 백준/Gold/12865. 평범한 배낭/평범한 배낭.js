const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [, K] = input[0].split(' ').map(Number);
  const stuff = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(K, stuff));
});

const solution = (K, stuff) => {
  const N = stuff.length;
  const dp = Array.from(Array(N + 1), () => Array(K + 1).fill(0));

  for (let i = 1; i <= stuff.length; i++) {
    const [weight, value] = stuff[i - 1];
    for (let w = 1; w <= K; w++) {
      if (w < weight) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
      }
    }
  }

  return dp[N][K];
};
