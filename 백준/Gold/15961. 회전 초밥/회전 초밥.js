const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, d, k, c] = input[0].split(' ').map(Number);
  const dish = input.slice(1).map(Number);

  console.log(solution(N, d, k, c, dish));
});

const solution = (N, d, k, c, dish) => {
  const eat = Array(d + 1).fill(0);
  let answer = 1;
  let left = 0;
  let right = k;

  for (let i = 0; i < k - 1; i++) {
    dish.push(dish[i]);
  }

  eat[c] = 1;
  for (let i = left; i < right; i++) {
    if (!eat[dish[i]]) answer += 1;
    eat[dish[i]] += 1;
  }

  let count = answer;
  while (right < dish.length) {
    eat[dish[left]] -= 1;
    if (!eat[dish[left]]) count -= 1;
    left += 1;

    if (!eat[dish[right]]) count += 1;
    eat[dish[right]] += 1;
    right += 1;

    answer = Math.max(answer, count);
  }

  return answer;
};
