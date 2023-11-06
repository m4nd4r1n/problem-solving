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
  const limits = input[1].split(' ').map(Number);
  const M = Number(input[2]);
  const weights = input[3].split(' ').map(Number);

  console.log(solution(N, M, limits, weights));
});

const solution = (N, M, limits, weights) => {
  weights.sort((a, b) => b - a);
  limits.sort((a, b) => b - a);

  if (limits[0] < weights[0]) return -1;

  let time = 0;

  while (weights.length) {
    time += 1;
    for (const limit of limits) {
      for (let i = 0; i < weights.length; i++) {
        if (weights[i] <= limit) {
          weights.splice(i, 1);
          break;
        }
      }
    }
  }

  return time;
};
