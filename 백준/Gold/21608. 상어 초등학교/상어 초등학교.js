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
  const students = input.slice(1, N * N + 1).map((row) => row.split(' ').map(Number));

  console.log(solution(N, students));
});

const solution = (N, students) => {
  const classroom = Array.from(Array(N), () => Array(N).fill(0));
  const studentFavoriteMap = new Map();
  const satisfaction = [0, 1, 10, 100, 1000];

  students.forEach(([student, ...favorites]) => {
    const favoriteMap = favorites.reduce((map, student) => {
      map.set(student, true);
      return map;
    }, new Map());
    studentFavoriteMap.set(student, favoriteMap);

    const seats = findSeats(N, classroom, favoriteMap);
    const { row, col } = seats[0];
    classroom[row][col] = student;
  });

  let result = 0;
  traverseGrid(classroom, (student, row, col, origin) => {
    let count = 0;
    const favoriteMap = studentFavoriteMap.get(student);
    check(row, col, (x, y) => {
      if (x >= 0 && x < N && y >= 0 && y < N && favoriteMap.get(origin[x][y])) {
        count += 1;
      }
    });
    result += satisfaction[count];
  });
  return result;
};

const findSeats = (N, classroom, favoriteMap) => {
  const possibleSeats = [];

  traverseGrid(classroom, (student, row, col, origin) => {
    if (student) return;
    let favCount = 0;
    let emptyCount = 0;
    check(row, col, (x, y) => {
      if (x < 0 || x >= N || y < 0 || y >= N) return;
      if (favoriteMap.get(origin[x][y])) favCount += 1;
      if (origin[x][y] === 0) emptyCount += 1;
    });
    possibleSeats.push({ row, col, favCount, emptyCount });
  });

  possibleSeats.sort((a, b) => {
    if (a.favCount === b.favCount) {
      if (a.emptyCount === b.emptyCount) {
        if (a.row === b.row) return a.col - b.col;
        return a.row - b.row;
      }
      return b.emptyCount - a.emptyCount;
    }
    return b.favCount - a.favCount;
  });

  return possibleSeats;
};

const traverseGrid = (grid, fn) => {
  const row = grid.length;
  const col = grid[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      fn(grid[i][j], i, j, grid);
    }
  }
};

const check = (row, col, fn) => {
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  for (let i = 0; i < 4; i++) {
    const x = dx[i] + row;
    const y = dy[i] + col;
    fn(x, y);
  }
};
