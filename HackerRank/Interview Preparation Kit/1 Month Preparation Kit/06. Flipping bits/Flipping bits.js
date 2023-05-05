/*
 * Complete the 'flippingBits' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts LONG_INTEGER n as parameter.
 */

function flippingBits(n) {
  // Write your code here
  const flipped = n
    .toString(2)
    .split("")
    .map((bit) => (bit === "1" ? "0" : "1"))
    .join("")
    .padStart(32, "1");
  return parseInt(flipped, 2);
}
