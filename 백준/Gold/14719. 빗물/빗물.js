const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [H, W] = input[0].split(' ').map(Number);
  const heights = input[1].split(' ').map(Number);

  console.log(solution(H, W, heights));
});

const solution = (H, W, heights) => {
  let answer = 0;

  for (const [index, height] of heights.entries()) {
    if (index === 0 || index === W - 1) continue;
    const leftMax = Math.max(...heights.slice(0, index));
    const rightMax = Math.max(...heights.slice(index + 1));

    answer += Math.max(0, Math.min(leftMax, rightMax) - height);
  }

  return answer;
};
