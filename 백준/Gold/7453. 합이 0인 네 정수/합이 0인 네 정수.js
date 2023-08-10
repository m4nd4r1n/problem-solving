const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const N = parseInt(input[0]);
  const integers = input.slice(1).map((v) => v.split(' ').map(Number));

  solution(integers);
});

const solution = (integers) => {
  const A = 0;
  const B = 1;
  const C = 2;
  const D = 3;
  const N = integers.length;
  const sumABMap = new Map();

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const sumAB = integers[i][A] + integers[j][B];
      sumABMap.set(sumAB, (sumABMap.get(sumAB) ?? 0) + 1);
    }
  }

  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const sumCD = integers[i][C] + integers[j][D];
      count += sumABMap.get(-sumCD) ?? 0;
    }
  }

  console.log(count);
};
