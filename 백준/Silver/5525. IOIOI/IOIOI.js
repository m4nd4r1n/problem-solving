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
  const M = Number(input[1]);
  const S = input[2];

  console.log(solution(N, M, S));
});

const solution = (N, M, S) => {
  let answer = 0;
  let n = 0;
  let i = 0;

  while (i < M - 1) {
    if (S.slice(i, i + 3) === 'IOI') {
      n += 1;
      i += 2;
      if (n === N) {
        answer += 1;
        n -= 1;
      }
    } else {
      i += 1;
      n = 0;
    }
  }

  return answer;
};
