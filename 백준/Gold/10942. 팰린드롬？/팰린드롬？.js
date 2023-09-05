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
  const questions = input.slice(3).map((v) => v.split(' ').map(Number));

  console.log(solution(N, numbers, questions));
});

const solution = (N, numbers, questions) => {
  const result = [];
  const palindrome = Array.from(Array(N + 1), () => Array(N + 1).fill(false));

  // length = 1
  for (let i = 1; i <= N; i++) {
    palindrome[i][i] = true;
  }

  // length = 2
  for (let i = 1; i < N; i++) {
    if (numbers[i - 1] === numbers[i]) palindrome[i][i + 1] = true;
  }

  // length >= 3
  for (let i = N - 2; i >= 1; i--) {
    for (let j = i + 2; j <= N; j++) {
      if (numbers[i - 1] === numbers[j - 1] && palindrome[i + 1][j - 1]) {
        palindrome[i][j] = true;
      }
    }
  }

  for (const [S, E] of questions) {
    if (palindrome[S][E]) result.push(1);
    else result.push(0);
  }

  return result.join('\n');
};
