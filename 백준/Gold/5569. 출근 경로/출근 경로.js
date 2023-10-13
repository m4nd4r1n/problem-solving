const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [w, h] = input[0].split(' ').map(Number);

  console.log(solution(w, h));
});

const EAST = 0;
const NORTH = 1;
const MOD = 100_000;

const solution = (w, h) => {
  const dp = Array.from(Array(w + 1), () =>
    Array.from(Array(h + 1), () => [
      [0, 0],
      [0, 0],
    ]),
  );

  for (let i = 2; i <= w; i++) {
    dp[i][1][EAST][0] = 1;
  }
  for (let i = 2; i <= h; i++) {
    dp[1][i][NORTH][0] = 1;
  }

  for (let i = 2; i <= w; i++) {
    for (let j = 2; j <= h; j++) {
      dp[i][j][NORTH][0] = (dp[i][j - 1][NORTH][1] + dp[i][j - 1][NORTH][0]) % MOD;
      dp[i][j][NORTH][1] = dp[i][j - 1][EAST][0];
      dp[i][j][EAST][0] = (dp[i - 1][j][EAST][1] + dp[i - 1][j][EAST][0]) % MOD;
      dp[i][j][EAST][1] = dp[i - 1][j][NORTH][0];
    }
  }

  let result = 0;
  for (const [a, b] of dp[w][h]) {
    result += a + b;
  }

  return result % MOD;
};
