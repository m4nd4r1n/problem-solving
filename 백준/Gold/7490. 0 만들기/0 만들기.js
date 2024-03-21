const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const tests = input.slice(1).map(Number);

  console.log(solution(tests));
});

const solution = (tests) => {
  const results = [];

  tests.forEach((N) => {
    find(1, 1, '1', results, N);
    results.push('');
  });

  return results.join('\n');
};

const find = (num, depth, string, results, N) => {
  if (depth === N) {
    const result = calculate(string);
    if (result === 0) results.push(string);
    return;
  }

  find(num + 1, depth + 1, `${string} ${num + 1}`, results, N);
  find(num + 1, depth + 1, `${string}+${num + 1}`, results, N);
  find(num + 1, depth + 1, `${string}-${num + 1}`, results, N);
};

const calculate = (expression) => {
  const expressionWithoutSpace = expression.split(' ').join('');
  const numbers = expressionWithoutSpace.split(/[+-]/).map(Number);
  const operators = expressionWithoutSpace.split(/[^+-]/).filter(Boolean);
  let index = 1;

  return operators.reduce((result, op) => {
    if (op === '+') return result + numbers[index++];
    return result - numbers[index++];
  }, numbers[0]);
};
