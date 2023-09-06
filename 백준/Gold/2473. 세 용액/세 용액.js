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
  const answer = Array(3).fill(0);
  let min = Infinity;
  let left, right;

  attributes.sort((a, b) => a - b);

  for (let i = 0; i < N - 2; i++) {
    left = i + 1;
    right = N - 1;

    while (left < right) {
      const sum = attributes[i] + attributes[left] + attributes[right];

      if (Math.abs(sum) < min) {
        min = Math.abs(sum);
        answer[0] = attributes[i];
        answer[1] = attributes[left];
        answer[2] = attributes[right];
      }

      if (sum < 0) left += 1;
      else right -= 1;
    }
  }

  return answer.join(' ');
};
