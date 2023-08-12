const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const string = input[0];
  const explode = input[1];

  solution(string, explode);
});

const solution = (string, explode) => {
  const stack = [];

  for (const letter of string) {
    stack.push(letter);
    const sliced = stack.slice(-explode.length).join('');
    if (sliced !== explode) continue;
    Array(explode.length)
      .fill(0)
      .forEach(() => stack.pop());
  }

  if (stack.length === 0) console.log('FRULA');
  else console.log(stack.join(''));
};
