const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const N = Number(input[0]);
  const board = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, board));
});

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const solution = (N, board) => {
  const moves = [UP, DOWN, LEFT, RIGHT];
  const possibleMoves = permutationWithRepetition(moves, 5);
  const moveMap = {
    [UP]: moveUp,
    [DOWN]: moveDown,
    [LEFT]: moveLeft,
    [RIGHT]: moveRight,
  };

  return possibleMoves.reduce((max, move) => {
    const copiedBoard = board.map((v) => [...v]);
    move.forEach((direction) => {
      moveMap[direction](N, copiedBoard);
    });
    return Math.max(max, ...copiedBoard.flat());
  }, 0);
};

const permutationWithRepetition = (arr, r) => {
  if (r === 1) return arr.map((el) => [el]);

  return arr.flatMap((choice, _index, origin) =>
    permutationWithRepetition(origin, r - 1).map((el) => [choice, ...el]),
  );
};

const moveUp = (N, board) => {
  const pullUp = () => {
    for (let i = 0; i < N - 1; i++) {
      for (let j = 0; j < N; j++) {
        if (board[i][j] !== 0) continue;
        let k = i + 1;
        while (k <= N - 1) {
          if (board[k][j] === 0) {
            k += 1;
            continue;
          }
          board[i][j] = board[k][j];
          board[k][j] = 0;
          break;
        }
      }
    }
  };

  pullUp();

  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] !== board[i + 1][j]) continue;
      board[i][j] *= 2;
      board[i + 1][j] = 0;
    }
  }

  pullUp();
};

const moveDown = (N, board) => {
  const pullDown = () => {
    for (let i = N - 1; i > 0; i--) {
      for (let j = 0; j < N; j++) {
        if (board[i][j] !== 0) continue;
        let k = i - 1;
        while (k >= 0) {
          if (board[k][j] === 0) {
            k -= 1;
            continue;
          }
          board[i][j] = board[k][j];
          board[k][j] = 0;
          break;
        }
      }
    }
  };

  pullDown();

  for (let i = N - 1; i > 0; i--) {
    for (let j = 0; j < N; j++) {
      if (board[i - 1][j] !== board[i][j]) continue;
      board[i][j] *= 2;
      board[i - 1][j] = 0;
    }
  }

  pullDown();
};

const moveLeft = (N, board) => {
  const pullLeft = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N - 1; j++) {
        if (board[i][j] !== 0) continue;
        let k = j + 1;
        while (k <= N - 1) {
          if (board[i][k] === 0) {
            k += 1;
            continue;
          }
          board[i][j] = board[i][k];
          board[i][k] = 0;
          break;
        }
      }
    }
  };

  pullLeft();

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - 1; j++) {
      if (board[i][j] !== board[i][j + 1]) continue;
      board[i][j] *= 2;
      board[i][j + 1] = 0;
    }
  }

  pullLeft();
};

const moveRight = (N, board) => {
  const pullRight = () => {
    for (let i = 0; i < N; i++) {
      for (let j = N - 1; j > 0; j--) {
        if (board[i][j] !== 0) continue;
        let k = j - 1;
        while (k >= 0) {
          if (board[i][k] === 0) {
            k -= 1;
            continue;
          }
          board[i][j] = board[i][k];
          board[i][k] = 0;
          break;
        }
      }
    }
  };

  pullRight();

  for (let i = 0; i < N; i++) {
    for (let j = N - 1; j > 0; j--) {
      if (board[i][j] !== board[i][j - 1]) continue;
      board[i][j] *= 2;
      board[i][j - 1] = 0;
    }
  }

  pullRight();
};
