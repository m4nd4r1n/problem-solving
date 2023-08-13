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
  const stack = [];
  const result = [];

  for (const letter of formula) {
    if (letter === '(') {
      stack.push(letter);
    } else if (letter === ')') {
      while (stack[stack.length - 1] !== '(') {
        result.push(stack.pop());
      }
      stack.pop();
    } else if (letter === '+' || letter === '-') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        result.push(stack.pop());
      }
      stack.push(letter);
    } else if (letter === '*' || letter === '/') {
      while (stack.length && (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '/')) {
        result.push(stack.pop());
      }
      stack.push(letter);
    } else {
      result.push(letter);
    }
  }
  while (stack.length) {
    result.push(stack.pop());
  }

  return result.join('');
};
