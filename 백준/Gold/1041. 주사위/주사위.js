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
  const numbers = input[1].split(' ').map(Number);

  console.log(solution(N, numbers));
});

const solution = (N, numbers) => {
  if (N === 1) return numbers.reduce((acc, cur) => acc + cur, 0) - Math.max(...numbers);

  const side = Array(3).fill(0);
  let answer = 0;

  side[0] = Math.min(numbers[0], numbers[5]);
  side[1] = Math.min(numbers[1], numbers[4]);
  side[2] = Math.min(numbers[2], numbers[3]);
  side.sort((a, b) => a - b);

  answer += side[0] * (4 * (N - 1) * (N - 2) + (N - 2) ** 2);
  answer += (side[0] + side[1]) * (4 * (2 * N - 3));
  answer += (side[0] + side[1] + side[2]) * 4;

  return answer;
};
