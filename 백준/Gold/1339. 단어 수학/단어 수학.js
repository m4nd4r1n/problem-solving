const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N] = input[0].split(' ').map(Number);
  const words = input.slice(1);

  console.log(solution(N, words));
});

const solution = (N, words) => {
  const weightMap = new Map();

  words.forEach((word) => {
    let weight = 1;
    word.split('').reduceRight((_, char) => {
      weightMap.set(char, (weightMap.get(char) ?? 0) + weight);
      weight *= 10;
    }, 0);
  });

  const weights = [...weightMap.values()].sort((a, b) => b - a);

  return weights.reduce((acc, weight, index) => acc + weight * (9 - index), 0);
};
