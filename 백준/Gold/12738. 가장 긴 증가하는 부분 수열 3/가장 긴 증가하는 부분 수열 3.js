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
  const sequence = input[1].split(' ').map(Number);

  console.log(solution(N, sequence));
});

const solution = (N, sequence) => {
  const LIS = [sequence[0], ...Array(N - 1).fill(0)];
  let last = 1;

  for (let i = 0; i < N; i++) {
    if (sequence[i] > LIS[last - 1]) {
      LIS[last] = sequence[i];
      last += 1;
      continue;
    }
    let left = 0;
    let right = last;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (LIS[mid] >= sequence[i]) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    LIS[right] = sequence[i];
  }

  return last;
};
