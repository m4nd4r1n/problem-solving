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
  return getSubsets(sequence)
    .map((subset) => subset.reduce((sum, cur) => sum + cur, 0))
    .filter((sum) => sum === S).length;
};

const getSubsets = (sequence) =>
  Array((1 << sequence.length) - 1)
    .fill(0)
    .map((_, bit) => sequence.filter((_, index) => (bit + 1) & (1 << index)));
