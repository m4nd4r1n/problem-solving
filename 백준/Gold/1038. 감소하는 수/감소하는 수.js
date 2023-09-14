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

  console.log(solution(N));
});

const solution = (N) => {
  if (N > (1 << 10) - 2) return -1;

  const sequence = Array(10)
    .fill(0)
    .map((_, index) => 9 - index);

  const decreaseNumbers = getSubsets(sequence)
    .map((subset) => Number(subset.join('')))
    .sort((a, b) => a - b);

  return decreaseNumbers[N];
};

const getSubsets = (sequence) =>
  Array((1 << sequence.length) - 1)
    .fill(0)
    .map((_, bit) => sequence.filter((_, index) => (bit + 1) & (1 << index)));
