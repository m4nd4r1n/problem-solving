const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const tests = input.slice(1);

  solution(tests);
});

const solution = (tests) => {
  const length = tests.length;
  const result = [];

  for (let i = 0; i < length; i += 3) {
    const ops = tests[i].split('');
    const arr = tests[i + 2].replace(/\[|\]/g, '').split(',').filter(Boolean).map(Number);
    let error = false;
    let reversed = false;
    let start = 0;
    let end = arr.length;

    for (const op of ops) {
      if (op === 'R') {
        reversed = !reversed;
        continue;
      }
      if (op === 'D') {
        if (start === end) {
          error = true;
          break;
        }
        reversed ? (end -= 1) : (start += 1);
        continue;
      }
    }

    if (error) {
      result.push('error');
    } else {
      const resultArr = arr.slice(start, end);
      reversed && resultArr.reverse();
      result.push(`[${resultArr.join(',')}]`);
    }
  }

  console.log(result.join('\n'));
};
