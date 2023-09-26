const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const formula = input[0];

  console.log(solution(formula));
});

const solution = (formula) => {
  const numbers = formula.split(/[+|-]/).map(Number);
  const operators = formula.split(/[0-9]/).filter(Boolean);
  let answer = numbers[0];
  let isMinus = false;

  for (const [i, operator] of operators.entries()) {
    if (operator === '-') isMinus = true;
    if (isMinus) {
      answer -= numbers[i + 1];
    } else {
      answer += numbers[i + 1];
    }
  }

  return answer;
};
