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
  const sequence = input[1].split(' ').map(Number);
  const operators = input[2].split(' ').map(Number);

  console.log(solution(N, sequence, operators));
});

const solution = (N, sequence, operators) => {
  let [plus, minus, multiply, divide] = operators;
  let min = Infinity;
  let max = -Infinity;

  const find = (index, sum) => {
    if (index === N) {
      min = Math.min(min, sum);
      max = Math.max(max, sum);
      return;
    }

    if (plus > 0) {
      plus -= 1;
      find(index + 1, sum + sequence[index]);
      plus += 1;
    }
    if (minus > 0) {
      minus -= 1;
      find(index + 1, sum - sequence[index]);
      minus += 1;
    }
    if (multiply > 0) {
      multiply -= 1;
      find(index + 1, sum * sequence[index]);
      multiply += 1;
    }
    if (divide > 0) {
      divide -= 1;
      if (sum < 0) find(index + 1, -Math.floor(-sum / sequence[index]));
      else find(index + 1, Math.floor(sum / sequence[index]));
      divide += 1;
    }
  };

  find(1, sequence[0]);

  return `${max}\n${min}`;
};
