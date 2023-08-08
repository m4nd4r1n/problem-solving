const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const [N] = input[0].split(' ').map(Number);

const matrixSizes = [, ...input.slice(1).map((str) => str.split(' ').map(Number))];

function solution(N, matrixSizes) {
  const dp = Array.from(Array(N + 1), () => Array(N + 1).fill(0));

  for (let step = 1; step < N; step++) {
    for (let start = 1; start + step <= N; start++) {
      const end = step + start;

      dp[start][end] = Infinity;

      for (let mid = start; mid < end; mid++) {
        const newCaculate =
          dp[start][mid] +
          dp[mid + 1][end] +
          matrixSizes[start][0] * matrixSizes[mid][1] * matrixSizes[end][1];

        dp[start][end] = Math.min(dp[start][end], newCaculate);
      }
    }
  }

  console.log(dp[1][N]);
}

solution(N, matrixSizes);