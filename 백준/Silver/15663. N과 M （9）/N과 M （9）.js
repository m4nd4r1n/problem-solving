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
  const arr = input[1].split(' ').map(Number);

  console.log(solution(M, arr));
});

const solution = (M, arr) => {
  const result = permutation(
    arr.sort((a, b) => a - b),
    M,
  );

  return [...new Set(result.map((v) => v.join(' ')))].join('\n');
};

const permutation = (arr, r) => {
  if (r === 1) return arr.map((el) => [el]);

  return arr.flatMap((choice, index, origin) =>
    permutation([...origin.slice(0, index), ...origin.slice(index + 1)], r - 1).map((el) => [
      choice,
      ...el,
    ]),
  );
};
