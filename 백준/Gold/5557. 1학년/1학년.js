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
  const numbers = input[1].split(' ').map(Number);

  console.log(solution(N, numbers));
});

const MAX_NUMBER = 20;

const solution = (N, numbers) => {
  const dp = Array.from(Array(N), () => Array(MAX_NUMBER + 1).fill(0n));
  // dp[i][j] : i번째 수까지 계산했을 때, j라는 숫자가 나올 수 있는 경우의 수

  dp[0][numbers[0]] = 1n;

  for (let i = 1; i < N - 1; i++) {
    for (let j = 0; j <= MAX_NUMBER; j++) {
      if (dp[i - 1][j] === 0n) continue;

      const plus = j + numbers[i];
      const minus = j - numbers[i];

      if (plus <= MAX_NUMBER) dp[i][plus] += dp[i - 1][j];
      if (minus >= 0) dp[i][minus] += dp[i - 1][j];
    }
  }

  return dp[N - 2][numbers[N - 1]].toString();
};
