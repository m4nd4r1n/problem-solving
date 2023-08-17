const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const N = Number(input[0]);
  const points = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, points));
});

const solution = (N, points) => {
  let answer = 0;
  for (let i = 1; i < N - 1; i++) {
    const [x1, y1] = points[0];
    const [x2, y2] = points[i];
    const [x3, y3] = points[i + 1];
    answer += (x1 * y2 + x2 * y3 + x3 * y1 - x2 * y1 - x3 * y2 - x1 * y3) / 2;
  }
  return Math.abs(answer).toFixed(1);
};
