const PRICE = 1;

function solution(prices) {
  const stack = [];
  const result = Array(prices.length).fill(0);

  prices.forEach((price, index, origin) => {
    const nextPrice = origin[index + 1];
    stack.push([index, price]);

    if (price > nextPrice) {
      while (stack[stack.length - 1][PRICE] > nextPrice) {
        const [targetIndex] = stack.pop();
        result[targetIndex] = index - targetIndex + 1;
        if (!stack.length) break;
      }
    }
  });

  while (stack.length) {
    const [index] = stack.pop();
    result[index] = prices.length - index - 1;
  }

  return result;
}