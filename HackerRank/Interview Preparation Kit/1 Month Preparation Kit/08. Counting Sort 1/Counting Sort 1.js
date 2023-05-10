/*
 * Complete the 'countingSort' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function countingSort(arr) {
  // Write your code here
  const result = Array(100).fill(0);
  arr.forEach((num) => result[num]++);
  return result;
}
