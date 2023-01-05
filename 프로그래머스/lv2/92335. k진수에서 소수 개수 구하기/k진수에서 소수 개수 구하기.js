const solution = (n, k) =>
  n
    .toString(k)
    .split("0")
    .filter(Boolean)
    .reduce((count, number) => (isPrime(+number) ? count + 1 : count), 0);

const isPrime = (number) => {
  if (number === 2) return true;
  if (number < 2 || number % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (!(number % i)) return false;
  }
  return true;
};