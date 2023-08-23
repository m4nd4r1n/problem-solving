const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const str1 = input[0];
  const str2 = input[1];

  console.log(solution(str1, str2));
});

const solution = (str1, str2) => {
  const len1 = str1.length;
  const len2 = str2.length;
  const LCS = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));
  const result = [];

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        LCS[i][j] = LCS[i - 1][j - 1] + 1;
      } else {
        LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
      }
    }
  }

  result.push(`${LCS[len1][len2]}\n`);

  const getLCS = (i, j) => {
    if (LCS[i][j] === 0) return;

    if (str1[i - 1] === str2[j - 1]) {
      getLCS(i - 1, j - 1);
      result.push(str1[i - 1]);
    } else {
      if (LCS[i - 1][j] > LCS[i][j - 1]) getLCS(i - 1, j);
      else getLCS(i, j - 1);
    }
  };

  getLCS(len1, len2);

  return result.join('');
};
