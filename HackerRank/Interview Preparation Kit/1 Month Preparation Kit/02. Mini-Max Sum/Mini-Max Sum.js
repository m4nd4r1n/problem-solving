/*
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr) {
  // Write your code here
  arr.sort((a, b) => b - a);
  const max = arr.slice(0, 4).reduce((sum, number) => sum + number, 0);
  const min = arr
    .slice(arr.length - 4, arr.length)
    .reduce((sum, number) => sum + number, 0);
  console.log(`${min} ${max}`);
}
