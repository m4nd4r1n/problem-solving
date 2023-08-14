const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, B] = input[0].split(' ').map(Number);
  const matrix = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, B, matrix));
});

const solution = (N, B, matrix) => {
  const multiply = (matrix1, matrix2) => {
    const result = Array.from(Array(N), () => Array(N).fill(0));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++)
        for (let k = 0; k < N; k++) {
          result[i][j] += (matrix1[i][k] * matrix2[k][j]) % 1000;
        }
    }

    return result;
  };

  const pow = (b) => {
    if (b === 1) return matrix;
    const temp = pow(Math.floor(b / 2));
    if (b % 2 === 0) return multiply(temp, temp);
    else return multiply(multiply(temp, temp), matrix);
  };

  return pow(B)
    .map((v) => v.map((v) => v % 1000))
    .map((v) => v.join(' '))
    .join('\n');
};
