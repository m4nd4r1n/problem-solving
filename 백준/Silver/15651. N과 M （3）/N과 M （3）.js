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

  console.log(solution(N, M));
});

const solution = (N, M) => {
  const arr = Array.from(Array(N), (_, i) => i + 1);

  return permutationWithRepetition(arr, M)
    .map((v) => v.join(' '))
    .join('\n');
};

const permutationWithRepetition = (arr, r) => {
  if (r === 1) return arr.map((v) => [v]);

  return arr.flatMap((choice, _index, origin) =>
    permutationWithRepetition(origin, r - 1).map((v) => [choice, ...v]),
  );
};
