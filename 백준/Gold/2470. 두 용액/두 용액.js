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
  const attributes = input[1].split(' ').map(Number);

  console.log(solution(N, attributes));
});

const solution = (N, attributes) => {
  const answer = Array(2).fill(0);
  let min = Infinity;
  let left = 0;
  let right = N - 1;

  attributes.sort((a, b) => a - b);

  while (left < right) {
    const sum = attributes[left] + attributes[right];

    if (Math.abs(sum) < min) {
      min = Math.abs(sum);
      answer[0] = attributes[left];
      answer[1] = attributes[right];
    }

    if (sum < 0) left += 1;
    else right -= 1;
  }

  return answer.sort((a, b) => a - b).join(' ');
};
