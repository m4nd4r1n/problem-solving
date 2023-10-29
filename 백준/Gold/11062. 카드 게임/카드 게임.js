const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const T = Number(input[0]);
  let testCases = [];
  for (let i = 0; i < T; i++) {
    testCases.push([Number(input[i * 2 + 1]), input[i * 2 + 2].split(' ').map(Number)]);
  }

  console.log(solution(T, testCases));
});

const solution = (T, testCases) => {
  const result = [];

  for (const [N, cards] of testCases) {
    const dp = Array.from(Array(N + 1), () => Array(N + 1).fill(0));
    game(dp, cards, 0, N - 1, 1);
    result.push(dp[0][N - 1]);
  }

  return result.join('\n');
};

const game = (dp, cards, left, right, turn) => {
  if (left > right) return 0;
  if (dp[left][right]) return dp[left][right];

  if (turn % 2) {
    dp[left][right] = Math.max(
      cards[left] + game(dp, cards, left + 1, right, turn + 1),
      cards[right] + game(dp, cards, left, right - 1, turn + 1),
    );
  } else {
    dp[left][right] = Math.min(
      game(dp, cards, left + 1, right, turn + 1),
      game(dp, cards, left, right - 1, turn + 1),
    );
  }
  return dp[left][right];
};
