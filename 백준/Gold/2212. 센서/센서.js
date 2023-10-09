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
  const K = Number(input[1]);
  const coords = input[2].split(' ').map(Number);

  console.log(solution(N, K, coords));
});

const solution = (N, K, coords) => {
  if (K >= N) return 0;

  const diff = Array(N - 1).fill(0);
  let result = 0;

  coords.sort((a, b) => a - b);

  for (let i = 0; i < N - 1; i++) {
    diff[i] = coords[i + 1] - coords[i];
  }

  diff.sort((a, b) => a - b);

  for (let i = 0; i < N - K; i++) {
    result += diff[i];
  }

  return result;
};
