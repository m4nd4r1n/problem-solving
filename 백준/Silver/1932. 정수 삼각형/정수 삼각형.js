const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const triangle = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(triangle));
});

const solution = (triangle) => {
  const N = triangle.length;
  const dp = Array.from(Array(N), () => Array(N).fill(0));

  dp[0][0] = triangle[0][0];

  for (let floor = 1; floor < N; floor++) {
    for (let i = 0; i <= floor; i++) {
      if (i === 0) dp[floor][i] = dp[floor - 1][i] + triangle[floor][i];
      else if (i === floor) dp[floor][i] = dp[floor - 1][i - 1] + triangle[floor][i];
      else dp[floor][i] = Math.max(dp[floor - 1][i - 1], dp[floor - 1][i]) + triangle[floor][i];
    }
  }

  return Math.max(...dp[N - 1]);
};
