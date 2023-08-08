const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const N = parseInt(input[0]);
const buses = input.slice(2).map((str) => str.split(' ').map(Number));

function solution(city, buses) {
  const distances = Array.from(Array(city + 1), () => Array(city + 1).fill(Infinity));

  for (let i = 1; i <= city; i++) {
    distances[i][i] = 0;
  }

  for (const [start, end, cost] of buses) {
    distances[start][end] = Math.min(distances[start][end], cost);
  }

  for (let mid = 1; mid <= city; mid++) {
    for (let start = 1; start <= city; start++) {
      for (let end = 1; end <= city; end++) {
        const throughMid = distances[start][mid] + distances[mid][end];
        if (distances[start][end] > throughMid) distances[start][end] = throughMid;
      }
    }
  }

  for (let i = 1; i <= city; i++) {
    for (let j = 1; j <= city; j++) {
      if (distances[i][j] === Infinity) process.stdout.write('0 ');
      else process.stdout.write(`${distances[i][j]} `);
    }
    console.log();
  }
}

solution(N, buses);
