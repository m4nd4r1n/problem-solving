const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [min, max] = input[0].split(' ').map(BigInt);

  console.log(solution(min, max));
});

const MAX = 1_000_000n;

const solution = (min, max) => {
  const diff = max - min;
  const arr = Array(Number(MAX) + 1).fill(false);
  let count = 0;
  for (let i = 0n; i < diff + 1n; i++) {
    arr[Number(i)] = true;
  }
  for (let i = 2n; i <= MAX; i++) {
    if (max < i * i) break;
    for (let j = min / (i * i); j * i * i <= max; j++) {
      if (i * i * j >= min) arr[Number(i * i * j - min)] = false;
    }
  }
  for (let i = 0n; i < diff + 1n; i++) {
    if (arr[Number(i)]) count += 1;
  }
  return count;
};
