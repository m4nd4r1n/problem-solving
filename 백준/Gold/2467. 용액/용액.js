const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const sols = input[1].split(' ').map(Number);

  console.log(solution(sols));
});

const solution = (sols) => {
  const N = sols.length;
  let left = 0;
  let right = N - 1;
  let min = Infinity;
  let result = [];

  while (left < right) {
    const sum = sols[left] + sols[right];
    const abs = Math.abs(sum);

    if (abs < min) {
      min = abs;
      result = [sols[left], sols[right]];
    }

    if (sum < 0) left += 1;
    else right -= 1;
  }

  return result.join(' ');
};
