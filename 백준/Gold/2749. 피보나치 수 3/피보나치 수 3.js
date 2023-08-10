const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const N = BigInt(input[0]);

  solution(N);
});

const solution = (N) => {
  const M = 1_000_000;
  const P = 15 * (M / 10);
  const fibo = [0, 1];

  for (let i = 2; i <= P; i++) {
    fibo.push((fibo[i - 1] + fibo[i - 2]) % M);
  }

  console.log(fibo[Number(N % BigInt(P))]);
};
