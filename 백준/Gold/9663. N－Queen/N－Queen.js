const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const N = parseInt(input[0]);
let count = 0;
const board = [];

function solution(N) {
  queen(0);
  console.log(count);
}

solution(N);

function queen(row) {
  if (row === N) {
    count++;
    return;
  }

  for (let col = 0; col < N; col++) {
    board[row] = col;
    if (canSet(row)) {
      queen(row + 1);
    }
  }
}

function canSet(row) {
  for (let col = 0; col < row; col++) {
    if (board[row] === board[col] || row - col === Math.abs(board[row] - board[col])) {
      return false;
    }
  }
  return true;
}
