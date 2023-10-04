const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N] = input[0].split(' ').map(Number);
  const times = input.slice(1).map((row) => row.split(' ').map(Number));

  console.log(solution(N, times));
});

const solution = (N, times) => {
  let count = 0;
  let lastEnd = 0;

  times.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  for (const [start, end] of times) {
    if (start >= lastEnd) {
      count += 1;
      lastEnd = end;
    }
  }

  return count;
};
