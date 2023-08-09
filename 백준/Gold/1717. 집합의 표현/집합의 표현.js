const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N] = input[0].split(' ').map(Number);
  const operations = input.slice(1).map((v) => v.split(' ').map(Number));

  solution(N, operations);
});

const solution = (N, operations) => {
  const result = [];
  const parent = Array(N + 1)
    .fill(0)
    .map((_, i) => i);

  const find = (value) => {
    if (parent[value] === value) return value;
    else return (parent[value] = find(parent[value]));
  };

  for (const [op, a, b] of operations) {
    if (op === 0) {
      const a_parent = find(a);
      const b_parent = find(b);

      if (a_parent < b_parent) parent[b_parent] = a_parent;
      else parent[a_parent] = b_parent;
    } else {
      const a_parent = find(a);
      const b_parent = find(b);

      if (a_parent === b_parent) result.push('YES');
      else result.push('NO');
    }
  }

  console.log(result.join('\n'));
};
