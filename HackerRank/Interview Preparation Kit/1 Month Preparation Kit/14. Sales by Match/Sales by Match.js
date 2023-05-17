/*
 * Complete the 'sockMerchant' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY ar
 */

function sockMerchant(n, ar) {
  // Write your code here
  const stack = [];
  return ar
    .sort((a, b) => a - b)
    .reduce((count, color) => {
      if (!stack.includes(color)) {
        stack.push(color);
        return count;
      }
      stack.pop();
      return count + 1;
    }, 0);
}
