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

  console.log(solution(N, K));
});

const solution = (N, K) => {
  let left = 0;
  let right = N * N;
  while (left !== right) {
    const mid = Math.floor((left + right) / 2) + 1;
    const count = getCount(mid, N);
    if (count >= K) {
      right = mid - 1;
    } else {
      left = mid;
    }
  }

  return left + 1;
};

const getCount = (mid, N) => {
  let count = 0;
  for (let i = 1; i <= N; i++) {
    count += Math.min(Math.floor(mid / i), N);
    if (mid < i) break;
  }
  return count;
};
