/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr) {
  // Write your code here
  const primary = arr.reduce((sum, row, index) => sum + row[index], 0);
  const secondary = arr.reduce(
    (sum, row, index) => sum + row[arr.length - 1 - index],
    0
  );
  return Math.abs(primary - secondary);
}
