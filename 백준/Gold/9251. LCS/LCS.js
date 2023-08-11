const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const X = input[0];
  const Y = input[1];

  solution(X, Y);
});

const solution = (X, Y) => {
  const LCS = Array.from(Array(X.length + 1), () => Array(Y.length + 1).fill(0));

  const m = X.length;
  const n = Y.length;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (X[i - 1] === Y[j - 1]) {
        LCS[i][j] = LCS[i - 1][j - 1] + 1;
      } else {
        LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
      }
    }
  }

  console.log(LCS[m][n]);
};
