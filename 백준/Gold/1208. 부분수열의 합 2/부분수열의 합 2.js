const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, S] = input[0].split(' ').map(Number);
  const sequence = input[1].split(' ').map(Number);

  console.log(solution(N, S, sequence));
});

const solution = (N, S, sequence) => {
  const sumMap = new Map();
  const left = sequence.slice(0, N / 2);
  const right = sequence.slice(N / 2);
  const leftSubsets = getSubsets(left);
  const rightSubsets = getSubsets(right);
  let count = 0;

  for (const subset of leftSubsets) {
    const sum = subset.reduce((acc, cur) => acc + cur, 0);
    sumMap.set(sum, (sumMap.get(sum) ?? 0) + 1);
    if (sum === S) count += 1;
  }

  for (const subset of rightSubsets) {
    const sum = subset.reduce((acc, cur) => acc + cur, 0);
    count += sumMap.get(S - sum) ?? 0;
    if (sum === S) count += 1;
  }

  return count;
};

const getSubsets = (sequence) =>
  Array((1 << sequence.length) - 1)
    .fill(0)
    .map((_, bit) => sequence.filter((_, index) => (bit + 1) & (1 << index)));
