const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [L, C] = input[0].split(' ').map(Number);
  const alphabets = input[1].split(' ');

  console.log(solution(L, C, alphabets));
});

const solution = (L, C, alphabets) => {
  const result = [];
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  alphabets.sort();

  const find = (index, string, vowelCount, consonantCount) => {
    if (string.length === L) {
      if (vowelCount >= 1 && consonantCount >= 2) {
        result.push(string);
      }
      return;
    }

    for (let i = index; i < C; i++) {
      if (vowels.includes(alphabets[i])) {
        find(i + 1, string + alphabets[i], vowelCount + 1, consonantCount);
      } else {
        find(i + 1, string + alphabets[i], vowelCount, consonantCount + 1);
      }
    }
  };

  find(0, '', 0, 0);

  return result.join('\n');
};
