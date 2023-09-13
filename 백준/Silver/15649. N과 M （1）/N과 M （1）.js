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
  const horizons = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, M));
});

const solution = (N, M) => {
  const sequence = Array(N)
    .fill(0)
    .map((_, i) => i + 1);

  return permutation(sequence, M)
    .map((v) => v.join(' '))
    .join('\n');
};

const permutation = (arr, r) => {
  if (r === 1) return arr.map((v) => [v]);
  return arr.flatMap((choice, index, origin) =>
    permutation([...origin.slice(0, index), ...origin.slice(index + 1)], r - 1).map((v) => [
      choice,
      ...v,
    ]),
  );
};
