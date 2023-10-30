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
  const numbers = input.slice(1).map(Number);

  console.log(solution(N, numbers));
});

const solution = (N, numbers) => {
  const result = new Set();

  numbers.sort((a, b) => a - b);

  let gcdValue = numbers[1] - numbers[0];

  for (let i = 2; i < N; i++) {
    gcdValue = gcd(gcdValue, numbers[i] - numbers[i - 1]);
  }

  for (let m = 1; m * m <= gcdValue; m++) {
    if (gcdValue % m !== 0) continue;

    if (m > 1) result.add(m);
    result.add(Math.floor(gcdValue / m));
  }

  return [...result].sort((a, b) => a - b).join(' ');
};

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
