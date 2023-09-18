const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [, M] = input[0].split(' ').map(Number);
  const sequence = input[1].split(' ').map(Number);

  console.log(solution(M, sequence));
});

const solution = (M, sequence) => {
  sequence.sort((a, b) => a - b);

  return combinationWithRepetition(sequence, M)
    .map((v) => v.join(' '))
    .join('\n');
};

const combinationWithRepetition = (arr, r) => {
  if (r === 1) return arr.map((v) => [v]);

  return arr.flatMap((choice, index, origin) =>
    combinationWithRepetition(origin.slice(index), r - 1).map((v) => [choice, ...v]),
  );
};
