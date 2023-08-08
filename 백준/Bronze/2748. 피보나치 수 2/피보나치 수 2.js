const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const N = parseInt(input[0]);

function solution(N) {
  const fibo = [0n, 1n];
  for (let i = 2; i <= N; i++) {
    fibo.push(BigInt(fibo[i - 1]) + BigInt(fibo[i - 2]));
  }
  console.log(`${fibo[N]}`);
}

solution(N);
