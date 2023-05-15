/*
 * Complete the 'birthday' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY s
 *  2. INTEGER d
 *  3. INTEGER m
 */

function birthday(s, d, m) {
  // Write your code here
  return Array(s.length)
    .fill(0)
    .reduce((count, _, i) => {
      const sum = s.slice(i, i + m).reduce((prev, curr) => prev + curr, 0);
      if (sum === d) return count + 1;
      return count;
    }, 0);
}
