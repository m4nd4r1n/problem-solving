const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [R, C] = input[0].split(' ').map(Number);
  const board = input.slice(1).map((v) => v.split(''));

  console.log(solution(R, C, board));
});

const solution = (R, C, board) => {
  const visited = Array(26).fill(false);
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  let answer = 0;

  visited[board[0][0].charCodeAt(0) - 65] = true;

  const find = (x, y, cnt) => {
    answer = Math.max(answer, cnt);
    if (answer === 26) return;

    for (let i = 0; i < 4; i++) {
      const nextX = x + dx[i];
      const nextY = y + dy[i];

      if (nextX >= 0 && nextX < R && nextY >= 0 && nextY < C) {
        const nextIndex = board[nextX][nextY].charCodeAt(0) - 65;
        if (visited[nextIndex]) continue;
        visited[nextIndex] = true;
        find(nextX, nextY, cnt + 1);
        visited[nextIndex] = false;
      }
    }
  };

  find(0, 0, 1);
  return answer;
};
