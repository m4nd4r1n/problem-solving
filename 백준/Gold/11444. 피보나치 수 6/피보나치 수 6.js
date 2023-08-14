const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const N = BigInt(input[0]);

  console.log(solution(N));
});

const solution = (N) => {
  const M = 1_000_000_007n;
  const matrix = [
    [1n, 1n],
    [1n, 0n],
  ];
  const multiply = (matrix1, matrix2) => {
    const result = Array.from(Array(2), () => Array(2).fill(0n));

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++)
        for (let k = 0; k < 2; k++) {
          result[i][j] += (matrix1[i][k] * matrix2[k][j]) % M;
        }
    }

    return result;
  };

  const pow = (b) => {
    if (b === 1n) return matrix;
    const temp = pow(b / 2n);
    if (b % 2n === 0n) return multiply(temp, temp);
    else return multiply(multiply(temp, temp), matrix);
  };

  return (pow(N)[0][1] % M).toString();
};
