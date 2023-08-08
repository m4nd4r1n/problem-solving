const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const [N] = input[0].split(' ').map(Number);

function solution(N) {
  const primes = getPrimes(N);
  const primeSum = [0];

  let sum = 0;
  for (const prime of primes) {
    sum += prime;
    primeSum.push(sum);
  }

  let count = 0,
    left = 0,
    right = 0;

  while (left <= right && right < primeSum.length) {
    const diff = primeSum[right] - primeSum[left];
    if (diff > N) {
      left += 1;
    } else if (diff < N) {
      right += 1;
    } else {
      count += 1;
      right += 1;
    }
  }

  console.log(count);
}

const getPrimes = (n) => {
  const primes = new Array(n + 1).fill(true);
  primes[0] = primes[1] = false;
  for (let i = 2; i <= n; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }
  return primes.map((isPrime, number) => isPrime && number).filter(Boolean);
};

solution(N);
