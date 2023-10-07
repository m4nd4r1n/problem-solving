const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N] = input[0].split(' ').map(Number);
  const numbers = input.slice(1).map(Number);

  console.log(solution(N, numbers));
});

const solution = (N, numbers) => {
  const positive = [];
  const negative = [];
  let zero = 0;
  let result = 0;

  numbers.forEach((num) => {
    if (num === 1) result += num;
    else if (num === 0) zero += 1;
    else if (num < 0) negative.push(-num);
    else positive.push(num);
  });

  negative.sort((a, b) => b - a);
  positive.sort((a, b) => b - a);

  for (let i = 0; i < Math.floor(negative.length / 2); i++) {
    result += negative[2 * i] * negative[2 * i + 1];
  }
  if (negative.length % 2 === 1 && zero === 0) result -= negative[negative.length - 1];

  for (let i = 0; i < Math.floor(positive.length / 2); i++) {
    result += positive[2 * i] * positive[2 * i + 1];
  }
  if (positive.length % 2 === 1) result += positive[positive.length - 1];

  return result;
};
