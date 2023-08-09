const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const machines = input
    .join('\n')
    .split('\n\n')
    .map((v) => v.split('\n'))
    .slice(0, -1);

  solution(machines);
});

const commandMap = {
  NUM: (stack, number) => {
    stack.push(Number(number));
    return true;
  },
  POP: (stack) => {
    if (stack.length === 0) return false;
    stack.pop();
    return true;
  },
  INV: (stack) => {
    if (stack.length === 0) return false;
    stack[stack.length - 1] *= -1;
    return true;
  },
  DUP: (stack) => {
    if (stack.length === 0) return false;
    stack.push(stack[stack.length - 1]);
    return true;
  },
  SWP: (stack) => {
    if (stack.length < 2) return false;
    [stack[stack.length - 1], stack[stack.length - 2]] = [
      stack[stack.length - 2],
      stack[stack.length - 1],
    ];
    return true;
  },
  ADD: (stack) => {
    if (stack.length < 2) return false;
    const a = stack.pop();
    const b = stack.pop();
    stack.push(a + b);
    return true;
  },
  SUB: (stack) => {
    if (stack.length < 2) return false;
    const a = stack.pop();
    const b = stack.pop();
    stack.push(b - a);
    return true;
  },
  MUL: (stack) => {
    if (stack.length < 2) return false;
    const a = stack.pop();
    const b = stack.pop();
    stack.push(a * b);
    return true;
  },
  DIV: (stack) => {
    if (stack.length < 2) return false;
    const a = stack.pop();
    const b = stack.pop();
    if (a === 0) return false;
    let result = Math.trunc(Math.abs(b) / Math.abs(a));
    if (a * b < 0) result *= -1;
    stack.push(result);
    return true;
  },
  MOD: (stack) => {
    if (stack.length < 2) return false;
    const a = stack.pop();
    const b = stack.pop();
    if (a === 0) return false;
    let result = Math.abs(b) % Math.abs(a);
    if (b < 0) result *= -1;
    stack.push(result);
    return true;
  },
};

const MAX = Math.pow(10, 9);

const solution = (machines) => {
  const result = [];
  for (const machine of machines) {
    const [commands, [, ...inputs]] = machine
      .join('\n')
      .split('END\n')
      .map((v) => v.split('\n'));

    for (const number of inputs) {
      let error = false;
      const stack = [Number(number)];

      for (const command of commands) {
        if (!command) continue;
        const [op, number] = command.split(' ');
        if (!commandMap[op](stack, number)) {
          error = true;
          break;
        }
      }

      if (error || stack.length !== 1 || stack[0] > MAX || stack[0] < -MAX) {
        result.push('ERROR');
      } else {
        result.push(stack[0]);
      }
    }
    result.push('');
  }
  console.log(result.join('\n'));
};
