const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, , H] = input[0].split(' ').map(Number);
  const horizons = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, H, horizons));
});

const solution = (N, H, horizons) => {
  const ladder = Array.from(Array(H + 1), () => Array(N + 1).fill(false));

  for (const [a, b] of horizons) {
    ladder[a][b] = true;
  }

  const check = () => {
    for (let i = 1; i <= N; i++) {
      let horizon = 1;
      let vertical = i;

      while (horizon <= H) {
        if (ladder[horizon][vertical]) {
          // 오른쪽 이동
          vertical += 1;
        } else if (ladder[horizon][vertical - 1]) {
          // 왼쪽 이동
          vertical -= 1;
        }
        // 아래로 이동
        horizon += 1;
      }
      // i번 세로선의 결과가 i번이 아닌 경우
      if (vertical !== i) return false;
    }

    return true;
  };

  const dfs = (horizon, cnt) => {
    if (cnt > 3) return;
    if (check()) {
      ans = Math.min(ans, cnt);
      return;
    }

    for (let i = horizon; i <= H; i++) {
      for (let j = 1; j < N; j++) {
        // 연속된 가로선이 아닌 경우
        if (!ladder[i][j] && !ladder[i][j - 1] && !ladder[i][j + 1]) {
          ladder[i][j] = true;
          dfs(i, cnt + 1);
          ladder[i][j] = false;
        }
      }
    }
  };

  let ans = 4;
  dfs(1, 0);

  return ans === 4 ? -1 : ans;
};
