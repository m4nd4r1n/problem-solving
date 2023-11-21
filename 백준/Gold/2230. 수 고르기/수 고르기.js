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
  const seq = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, M, seq));
});

const solution = (N, M, seq) => {
  seq.sort((a, b) => a - b);

  let diff = Infinity;
  let end = 0;
  for (let start = 0; start < N; start++) {
    while (end < N && seq[end] - seq[start] < M) end++;
    if (end === N) break;
    diff = Math.min(diff, seq[end] - seq[start]);
  }

  return diff;
};
