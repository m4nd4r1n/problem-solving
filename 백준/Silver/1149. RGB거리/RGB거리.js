const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const costs = [, ...input.slice(1).map((v) => v.split(' ').map(Number))];

  console.log(solution(costs));
});

const RED = 0;
const GREEN = 1;
const BLUE = 2;

const solution = (costs) => {
  const N = costs.length - 1;
  const dp = Array.from(Array(N + 1), () => Array(3).fill(0));

  for (let house = 1; house <= N; house++) {
    dp[house][RED] = Math.min(dp[house - 1][GREEN], dp[house - 1][BLUE]) + costs[house][RED];
    dp[house][GREEN] = Math.min(dp[house - 1][RED], dp[house - 1][BLUE]) + costs[house][GREEN];
    dp[house][BLUE] = Math.min(dp[house - 1][RED], dp[house - 1][GREEN]) + costs[house][BLUE];
  }

  return Math.min(...dp[N]);
};
