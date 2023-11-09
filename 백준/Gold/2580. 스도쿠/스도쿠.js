const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const board = input.map((row) => row.split(' ').map(Number));

  console.log(solution(board));
});

const solution = (board) => {
  const blankCoords = [];
  const result = [];
  let blankCount = 0;
  let complete = false;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        blankCoords.push([i, j]);
        blankCount++;
      }
    }
  }

  const check = (x, y, n) => {
    for (let i = 0; i < 9; i++) {
      if (board[x][i] === n || board[i][y] === n) return false;
    }

    const nx = Math.floor(x / 3) * 3;
    const ny = Math.floor(y / 3) * 3;

    for (let i = nx; i < nx + 3; i++) {
      for (let j = ny; j < ny + 3; j++) {
        if (board[i][j] === n) return false;
      }
    }

    return true;
  };

  const sudoku = (n) => {
    if (n === blankCount) {
      for (const row of board) {
        result.push(row.join(' '));
      }
      complete = true;
      return;
    }
    for (let i = 1; i <= 9; i++) {
      const [x, y] = blankCoords[n];
      if (check(x, y, i)) {
        board[x][y] = i;
        sudoku(n + 1);
        board[x][y] = 0;
      }
      if (complete) return;
    }
  };

  sudoku(0);

  return result.join('\n');
};
