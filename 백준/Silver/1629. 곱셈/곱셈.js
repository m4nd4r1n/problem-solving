const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [A, B, C] = input[0].split(' ').map(Number);

  console.log(solution(BigInt(A), B, BigInt(C)));
});

const solution = (A, B, C) => {
  const pow = (b) => {
    if (b === 1) return A % C;
    const temp = pow(Math.floor(b / 2));
    if (b % 2 === 0) return (temp * temp) % C;
    else return (((temp * temp) % C) * (A % C)) % C;
  };

  return pow(B).toString();
};
