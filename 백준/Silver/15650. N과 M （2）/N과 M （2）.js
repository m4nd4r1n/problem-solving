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
  const result = combination(arr, M);
  return result.map((el) => el.join(' ')).join('\n');
};

const combination = (arr, r) => {
  if (r === 1) return arr.map((el) => [el]);

  return arr.flatMap((choice, index, origin) =>
    combination(origin.slice(index + 1), r - 1).map((el) => [choice, ...el]),
  );
};
