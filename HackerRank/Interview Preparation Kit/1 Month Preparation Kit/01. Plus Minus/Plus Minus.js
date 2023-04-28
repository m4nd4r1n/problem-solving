/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
  // Write your code here
  const total = arr.length;
  const plus = arr.filter((number) => number > 0).length;
  const minus = arr.filter((number) => number < 0).length;
  const zero = arr.filter((number) => number === 0).length;
  console.log(plus / total);
  console.log(minus / total);
  console.log(zero / total);
}
