const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, M, T, K] = input[0].split(' ').map(Number);
  const coords = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, M, T, K, coords));
});

const solution = (N, M, T, K, coords) => {
  let maxX = 0;
  let maxY = 0;
  let max = 0;
  let x = 0;
  let y = 0;

  for (const [a] of coords) {
    for (const [, b] of coords) {
      if (a > N - K) x = N - K;
      else x = a;
      if (b > M - K) y = M - K;
      else y = b;

      let now = 0;
      for (const [c, d] of coords) {
        if (x <= c && c <= x + K && y <= d && d <= y + K) now += 1;
      }
      if (now > max) {
        max = now;
        maxX = x;
        maxY = y + K;
      }
    }
  }

  return `${maxX} ${maxY}\n${max}`;
};
