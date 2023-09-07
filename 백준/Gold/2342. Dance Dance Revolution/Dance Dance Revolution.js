const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const directions = input[0].split(' ').map(Number).slice(0, -1);

  console.log(solution(directions));
});

const CENTER_TO_OTHER = 2;
const ADJACENT = 3;
const OPPOSITE = 4;
const SAME = 1;

const solution = (directions) => {
  const N = directions.length;
  const dp = Array.from(Array(N + 1), () => Array.from(Array(5), () => Array(5).fill(Infinity)));

  const getCost = (from, to) => {
    if (from === to) return SAME;
    if (from === 0) return CENTER_TO_OTHER;
    if (Math.abs(from - to) === 2) return OPPOSITE;
    return ADJACENT;
  };

  const solve = (index, left, right) => {
    if (index === N) return 0;
    if (dp[index][left][right] !== Infinity) return dp[index][left][right];

    const next = directions[index];
    const leftCost = getCost(left, next) + solve(index + 1, next, right);
    const rightCost = getCost(right, next) + solve(index + 1, left, next);

    dp[index][left][right] = Math.min(leftCost, rightCost);
    return dp[index][left][right];
  };

  return solve(0, 0, 0);
};
