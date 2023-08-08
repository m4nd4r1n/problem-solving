const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);

function solution(N, K) {
  console.log(binomial(N, K));
}

solution(N, K);

function binomial(n, k) {
  if (k === 0 || n === k) return 1;
  return binomial(n - 1, k) + binomial(n - 1, k - 1);
}
