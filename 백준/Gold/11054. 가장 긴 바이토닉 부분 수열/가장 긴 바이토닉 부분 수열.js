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
  const seq = input[1].split(' ').map(Number);

  console.log(solution(N, seq));
});

const solution = (N, seq) => {
  const LIS = Array(N).fill(0);
  const LDS = Array(N).fill(0);
  let max = 0;

  LIS[0] = 1;
  for (let i = 1; i < N; i++) {
    LIS[i] = 1;
    for (let j = 0; j < i; j++) {
      if (seq[i] > seq[j]) {
        LIS[i] = Math.max(LIS[i], LIS[j] + 1);
      }
    }
  }

  LDS[N - 1] = 1;
  for (let i = N - 2; i >= 0; i--) {
    LDS[i] = 1;
    for (let j = N - 1; j > i; j--) {
      if (seq[i] > seq[j]) {
        LDS[i] = Math.max(LDS[i], LDS[j] + 1);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    max = Math.max(max, LIS[i] + LDS[i] - 1);
  }

  return max;
};
