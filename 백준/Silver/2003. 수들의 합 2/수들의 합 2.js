const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const numbers = input[1].split(' ').map(Number);

  console.log(solution(N, M, numbers));
});

const solution = (N, M, numbers) => {
  let start = 0;
  let end = 0;
  let sum = numbers[0];
  let count = 0;

  while (start <= end && end < N) {
    if (sum < M) {
      end += 1;
      sum += numbers[end];
    } else if (sum === M) {
      count += 1;
      end += 1;
      sum += numbers[end];
    } else if (sum > M) {
      sum -= numbers[start];
      start += 1;
      if (start > end && start < N) {
        end = start;
        sum = numbers[start];
      }
    }
  }

  return count;
};
