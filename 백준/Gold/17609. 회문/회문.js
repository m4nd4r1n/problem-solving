const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const strings = input.slice(1);

  console.log(solution(strings));
});

const PALINDROME = 0;
const PSEUDO_PALINDROME = 1;
const NOT_PALINDROME = 2;

const solution = (strings) => {
  const result = [];

  const isPalindrome = (left, right, string, deleted) => {
    while (left < right) {
      if (string[left] === string[right]) {
        left += 1;
        right -= 1;
      } else {
        if (deleted) return NOT_PALINDROME;
        if (
          isPalindrome(left + 1, right, string, true) === PALINDROME ||
          isPalindrome(left, right - 1, string, true) === PALINDROME
        ) {
          return PSEUDO_PALINDROME;
        } else return NOT_PALINDROME;
      }
    }
    return PALINDROME;
  };

  for (const string of strings) {
    result.push(isPalindrome(0, string.length - 1, string, false));
  }

  return result.join('\n');
};
