/*
 * Complete the 'lonelyinteger' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function lonelyinteger(a) {
  // Write your code here
  return a
    .sort((a, b) => a - b)
    .reduce((stack, num) => {
      if (!stack.includes(num)) stack.push(num);
      else stack.pop();
      return stack;
    }, [])[0];
}
