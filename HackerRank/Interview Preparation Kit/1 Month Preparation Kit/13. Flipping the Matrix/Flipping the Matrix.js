/*
 * Complete the 'flippingMatrix' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY matrix as parameter.
 */

function flippingMatrix(matrix) {
  // Write your code here
  const n = matrix.length;
  let max = 0;
  Array(n / 2)
    .fill(0)
    .forEach((_, j) => {
      Array(n / 2)
        .fill(0)
        .forEach((_, i) => {
          max += Math.max(
            matrix[i][j],
            matrix[i][n - 1 - j],
            matrix[n - 1 - i][j],
            matrix[n - 1 - i][n - 1 - j]
          );
        });
    });
  return max;
}
