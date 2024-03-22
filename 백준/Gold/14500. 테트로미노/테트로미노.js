const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const numbers = input.slice(1, N + 1).map((row) => row.split(' ').map(Number));

  console.log(solution(N, M, numbers));
});

const solution = (N, M, numbers) => {
  const visited = Array.from(Array(N), () => Array(M).fill(false));
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  const dxs = [
    // ㅜ
    [1, 0, 0],
    // ㅏ
    [1, 2, 1],
    // ㅗ
    [-1, 0, 0],
    // ㅓ
    [-1, 1, 0],
  ];
  const dys = [
    // ㅜ
    [1, 1, 2],
    // ㅏ
    [1, 0, 0],
    // ㅗ
    [1, 2, 1],
    // ㅓ
    [1, 1, 1],
  ];
  let result = 0;

  const find = (x, y, sum, depth) => {
    if (depth === 4) {
      result = Math.max(result, sum);
      return;
    }
    for (let i = 0; i < 4; i++) {
      const nextX = dx[i] + x;
      const nextY = dy[i] + y;
      if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= M) continue;
      if (!visited[nextX][nextY]) {
        visited[nextX][nextY] = true;
        find(nextX, nextY, sum + numbers[nextX][nextY], depth + 1);
        visited[nextX][nextY] = false;
      }
    }
  };

  const check = (x, y) => {
    for (let i = 0; i < 4; i++) {
      const dx = dxs[i];
      const dy = dys[i];
      let sum = numbers[x][y];

      for (let j = 0; j < 3; j++) {
        const nextX = dx[j] + x;
        const nextY = dy[j] + y;
        if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= M) {
          sum = 0;
          break;
        }
        sum += numbers[nextX][nextY];
      }
      result = Math.max(result, sum);
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      find(i, j, numbers[i][j], 1);
      visited[i][j] = false;
      check(i, j);
    }
  }

  return result;
};
