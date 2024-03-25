const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const T = Number(input[0]);
  const testCases = Array.from(Array(T), (_, i) => input[2 * i + 2].split(' ').map(Number));

  console.log(solution(testCases));
});

const solution = (testCases) =>
  testCases
    .map(
      (prices) =>
        prices.reduceRight(
          ({ max, sum }, current) => {
            if (max < current) return { max: current, sum };

            return { max, sum: sum + (max - current) };
          },
          { max: 0, sum: 0 },
        ).sum,
    )
    .join('\n');
