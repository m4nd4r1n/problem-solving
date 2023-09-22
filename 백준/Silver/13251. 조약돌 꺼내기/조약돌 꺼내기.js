const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const rocks = input[1].split(' ').map(Number);
  const K = Number(input[2]);

  console.log(solution(rocks, K));
});

const solution = (rocks, K) => {
  const N = rocks.reduce((sum, cur) => sum + cur, 0);
  let probablity = 0;

  for (let rock of rocks) {
    let k = K;
    let n = N;
    let prob = 1;
    while (k > 0) {
      prob *= rock / n;
      k -= 1;
      n -= 1;
      rock -= 1;
    }
    probablity += prob;
  }

  return probablity;
};
