const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const G = Number(input[0]);

  console.log(solution(G));
});

const solution = (G) => {
  const result = [];
  let left = 1;
  let right = 1;

  while (true) {
    const diff = right ** 2 - left ** 2;
    if (diff === G) {
      result.push(right);
      left += 1;
    } else if (diff < G) {
      right += 1;
    } else {
      left += 1;
    }

    if (left === right) break;
  }

  return result.length ? result.join('\n') : -1;
};
