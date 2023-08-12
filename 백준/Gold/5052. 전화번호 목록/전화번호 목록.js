const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const t = Number(input[0]);
  const testCases = [];
  let nIndex = 1;
  for (let i = 0; i < t; i++) {
    const n = Number(input[nIndex]);
    const phoneNumbers = input.slice(nIndex + 1, nIndex + n + 1);
    testCases.push(phoneNumbers);
    nIndex += n + 1;
  }
  solution(testCases);
});

const solution = (testCases) => {
  const result = [];

  for (const testCase of testCases) {
    testCase.sort();
    let isConsistent = true;
    for (const [index, phone] of testCase.entries()) {
      const nextPhone = testCase[index + 1];
      isConsistent = !(nextPhone && nextPhone.startsWith(phone));
      if (!isConsistent) break;
    }
    result.push(isConsistent ? 'YES' : 'NO');
  }

  console.log(result.join('\n'));
};
