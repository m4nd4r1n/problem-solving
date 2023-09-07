const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const radios = input.slice(1);

  console.log(solution(radios));
});

const solution = (radios) => {
  const result = [];

  for (const radio of radios) {
    if (/^(100+1+|01)+$/.test(radio)) {
      result.push('YES');
    } else {
      result.push('NO');
    }
  }

  return result.join('\n');
};
