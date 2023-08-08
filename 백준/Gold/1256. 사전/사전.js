const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const MAX_K = Math.pow(10, 9);

function solution(N, M, K) {
  const dp = Array.from(Array(N + 1), () => Array(M + 1).fill(0));
  let result = '';

  const check = (n, m) => {
    if (n === 0 || m === 0) return 1;
    if (dp[n][m] !== 0) return dp[n][m];

    dp[n][m] = Math.min(check(n - 1, m) + check(n, m - 1), MAX_K + 1);
    return dp[n][m];
  };

  const choose = (n, m, k) => {
    if (n === 0) {
      for (let i = 0; i < m; i++) {
        result += 'z';
      }
      return;
    }

    if (m === 0) {
      for (let i = 0; i < n; i++) {
        result += 'a';
      }
      return;
    }

    const checkCount = check(n - 1, m);
    if (k <= checkCount) {
      result += 'a';
      choose(n - 1, m, k);
    } else {
      result += 'z';
      choose(n, m - 1, k - checkCount);
    }
  };

  choose(N, M, K);

  if (check(N, M) < K) console.log(-1);
  else console.log(result);
}

solution(N, M, K);
