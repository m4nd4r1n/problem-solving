const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const [, K] = input[0].split(' ').map(Number);

const words = input.slice(1).map((str) => str.trim());

function solution(words, k) {
  if (k < 5) {
    console.log(0);
    return;
  }

  if (k === 26) {
    console.log(words.length);
    return;
  }

  const bitWords = words.map((word) => convertToBit(word));
  const checked = convertToBit('antic');
  let max = 0;

  const find = (pick, start, checked) => {
    if (pick === 0) {
      const count = bitWords.reduce((sum, word) => ((word & checked) === word ? sum + 1 : sum), 0);
      max = Math.max(max, count);
      return;
    }

    for (let i = start; i < 26; i++) {
      if ((checked & (1 << i)) !== 0) continue;

      checked |= 1 << i;
      find(pick - 1, i, checked);
      checked &= ~(1 << i);
    }
  };

  find(k - 5, 0, checked);

  console.log(max);
}

const convertToBit = (word) =>
  word.split('').reduce((sum, current) => sum | (1 << (current.charCodeAt(0) - 97)), 0);

solution(words, K);
