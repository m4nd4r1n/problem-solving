const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [, S] = input[0].split(' ').map(Number);
  const sequence = input[1].split(' ').map(Number);

  console.log(solution(S, sequence));
});

const solution = (S, sequence) => {
  let start = 0;
  let end = 0;
  let partialSum = sequence[0];
  let min = Infinity;

  const N = sequence.length;

  while (start < N && end < N) {
    if (partialSum < S) {
      end += 1;
      if (end === N) break;
      partialSum += sequence[end];
    } else {
      min = Math.min(min, end - start + 1);
      partialSum -= sequence[start];
      start += 1;
    }
  }

  return min === Infinity ? 0 : min;
};
