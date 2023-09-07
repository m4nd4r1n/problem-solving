const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const S = input[0];
  const T = input[1];

  console.log(solution(S, T));
});

const solution = (S, T) => {
  while (S.length !== T.length) {
    const last = T[T.length - 1];

    if (last === 'A') {
      T = T.slice(0, T.length - 1);
    }

    if (last === 'B') {
      T = T.slice(0, T.length - 1)
        .split('')
        .reverse()
        .join('');
    }
  }

  if (S === T) {
    return 1;
  } else {
    return 0;
  }
};
