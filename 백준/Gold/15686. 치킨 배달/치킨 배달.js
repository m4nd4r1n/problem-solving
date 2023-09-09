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
  const city = input.slice(1).map((v) => v.split(' ').map(Number));

  console.log(solution(N, M, city));
});

const HOUSE = 1;
const CHICKEN = 2;

const solution = (N, M, city) => {
  const chickenCoords = [];
  const houseCoords = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++)
      if (city[i][j] === CHICKEN) chickenCoords.push([i, j]);
      else if (city[i][j] === HOUSE) houseCoords.push([i, j]);
  }

  const chickenCoordCombination = combination(chickenCoords, M);
  let min = Infinity;

  for (const chickenCoord of chickenCoordCombination) {
    let sum = 0;

    for (const house of houseCoords) {
      let min = Infinity;
      for (const chicken of chickenCoord) {
        const dist = getDistance(house, chicken);
        min = Math.min(min, dist);
      }
      sum += min;
    }

    min = Math.min(min, sum);
  }

  return min;
};

const combination = (arr, r) => {
  if (r === 1) return arr.map((v) => [v]);

  return arr.flatMap((choice, index, origin) =>
    combination(origin.slice(index + 1), r - 1).map((v) => [choice, ...v]),
  );
};

const getDistance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
