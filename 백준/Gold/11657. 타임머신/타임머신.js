const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const [N] = input[0].split(' ').map(Number);
const buses = input.slice(1).map((str) => str.split(' ').map(Number));

function solution(city, buses) {
  /** @type {[number,number][][]} */
  const graph = Array.from(Array(city + 1), () => []);
  const distances = Array(city + 1).fill(Infinity);
  distances[1] = 0;

  for (const [start, end, cost] of buses) {
    graph[start].push([end, cost]);
  }

  for (let n = 1; n <= city; n++) {
    for (let i = 1; i <= city; i++) {
      for (const [next, cost] of graph[i]) {
        if (distances[i] !== Infinity && distances[next] > distances[i] + cost) {
          if (n === city) {
            console.log(-1);
            return;
          }
          distances[next] = distances[i] + cost;
        }
      }
    }
  }

  for (let i = 2; i <= city; i++) {
    if (distances[i] === Infinity) console.log(-1);
    else console.log(distances[i]);
  }
}

solution(N, buses);
