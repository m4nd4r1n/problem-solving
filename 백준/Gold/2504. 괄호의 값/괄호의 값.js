const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  console.log(solution(input[0]));
});

const solution = (string) => {
  const stack = [];
  let answer = 0;
  let temp = 1;
  let error, prev;

  for (const s of string) {
    [temp, answer, error] = bracketMap[s](stack, temp, answer, prev);
    prev = s;
    if (error) break;
  }

  if (stack.length) answer = 0;

  return answer;
};

const push = (string, value) => (stack, temp, answer) => {
  stack.push(string);
  return [temp * value, answer];
};

const pop = (string, value) => (stack, temp, answer, prev) => {
  if (!stack.length || stack[stack.length - 1] !== string) {
    return [temp, 0, true];
  }

  stack.pop();
  if (prev === string) {
    return [temp / value, answer + temp];
  } else {
    return [temp / value, answer];
  }
};

const bracketMap = {
  '(': push('(', 2),
  ')': pop('(', 2),
  '[': push('[', 3),
  ']': pop('[', 3),
};
