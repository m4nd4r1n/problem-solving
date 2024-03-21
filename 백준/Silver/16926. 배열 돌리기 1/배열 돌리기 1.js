const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, M, R] = input[0].split(' ').map(Number);
  const array = input.slice(1).map((row) => row.split(' ').map(Number));

  console.log(solution(N, M, R, array));
});

const solution = (N, M, R, array) =>
  Array.from(Array(R))
    .reduce((prevArr) => rotate(N, M, prevArr), array)
    .map((row) => row.join(' '))
    .join('\n');

const rotate = (N, M, array) => {
  const squares = Math.min(N, M) / 2;
  const rotated = Array.from(Array(N), () => Array.from(Array(M)));

  Array.from(Array(squares)).forEach((_, step) => {
    for (let i = M - 2 - step; i >= step; i--) {
      rotated[step][i] = array[step][i + 1];
    }
    for (let i = 1 + step; i < N - step; i++) {
      rotated[i][step] = array[i - 1][step];
    }
    for (let i = 1 + step; i < M - step; i++) {
      rotated[N - 1 - step][i] = array[N - 1 - step][i - 1];
    }
    for (let i = N - 2 - step; i >= step; i--) {
      rotated[i][M - 1 - step] = array[i + 1][M - 1 - step];
    }
  });

  return rotated;
};
