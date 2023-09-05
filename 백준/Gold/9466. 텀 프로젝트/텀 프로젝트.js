const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const T = Number(input[0]);
  const cases = [];

  for (let i = 0; i < T; i++) {
    const N = input[2 * i + 1];
    const selects = input[2 * (i + 1)].split(' ').map(Number);
    cases.push([N, selects]);
  }

  console.log(solution(T, cases));
});

const MAX = 100_000;

const solution = (T, cases) => {
  const result = [];
  const visited = Array(MAX + 1).fill(false);
  const done = Array(MAX + 1).fill(false);
  let matchedCount = 0;

  const dfs = (student, testIndex) => {
    const [, selects] = cases[testIndex];
    const nextStudent = selects[student - 1];

    visited[student] = true;

    if (!visited[nextStudent]) {
      dfs(nextStudent, testIndex);
    } else if (!done[nextStudent]) {
      for (let i = nextStudent; i !== student; i = selects[i - 1]) {
        matchedCount += 1;
      }
      matchedCount += 1;
    }

    done[student] = true;
  };

  for (let i = 0; i < T; i++) {
    const [N] = cases[i];

    for (let student = 1; student <= N; student++) {
      if (!visited[student]) dfs(student, i);
    }

    result.push(N - matchedCount);

    visited.fill(false);
    done.fill(false);
    matchedCount = 0;
  }

  return result.join('\n');
};
