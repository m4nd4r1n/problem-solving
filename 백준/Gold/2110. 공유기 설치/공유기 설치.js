const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, C] = input[0].split(' ').map(Number);
  const coords = input.slice(1).map(Number);

  console.log(solution(N, C, coords));
});

const solution = (N, C, coords) => {
  coords.sort((a, b) => a - b);

  let start = 1;
  let end = coords[N - 1] - coords[0];
  let answer = 0;

  const isPossibleDistance = (distance) => {
    let count = 1;
    let current = coords[0];

    for (let i = 1; i < N; i++) {
      if (coords[i] - current >= distance) {
        count += 1;
        current = coords[i];
      }
    }

    return count >= C;
  };

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (isPossibleDistance(mid)) {
      answer = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return answer;
};
