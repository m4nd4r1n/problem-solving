const WALL = 0;
const DR = [1, 0, -1, 0];
const DC = [0, 1, 0, -1];

function solution(maps) {
  const col = maps[0].length;
  const row = maps.length;
  const graph = Array(row)
    .fill(0)
    .map(() => Array(col).fill(-1));

  const isInRange = (r, c) => r >= 0 && r < row && c >= 0 && c < col;
  const canGoNext = (r, c) => isInRange(r, c) && maps[r][c] !== WALL && graph[r][c] === -1;

  const queue = [[0, 0]];
  graph[0][0] = 1;

  while (queue.length) {
    const [row, col] = queue.shift();
    Array(4)
      .fill(0)
      .forEach((_, i) => {
        const nextRow = row + DR[i];
        const nextCol = col + DC[i];
        if (!canGoNext(nextRow, nextCol)) return;
        graph[nextRow][nextCol] = graph[row][col] + 1;
        queue.push([nextRow, nextCol]);
      });
  }

  return graph[row - 1][col - 1];
}