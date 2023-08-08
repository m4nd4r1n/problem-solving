const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

const board = input.slice(1).map((str) => str.trim());

function solution(N, M, board) {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  const visited = Array.from(Array(N), () => Array(M).fill(false));
  const dp = Array.from(Array(N), () => Array(M).fill(-1));
  let circle = false;

  const isInRange = (x, y) => x >= 0 && x < N && y >= 0 && y < M;

  const dfs = (x, y) => {
    if (!isInRange(x, y) || board[x][y] === 'H') return 0;

    if (visited[x][y]) {
      circle = true;
      return -1;
    }

    if (dp[x][y] !== -1) return dp[x][y];

    visited[x][y] = true;
    for (let i = 0; i < 4; i++) {
      const move = parseInt(board[x][y]);
      const nextX = x + dx[i] * move;
      const nextY = y + dy[i] * move;
      dp[x][y] = Math.max(dp[x][y], dfs(nextX, nextY) + 1);
    }
    visited[x][y] = false;
    return dp[x][y];
  };

  const result = dfs(0, 0);

  if (circle) {
    console.log(-1);
    return;
  }

  console.log(result);
}

solution(N, M, board);
