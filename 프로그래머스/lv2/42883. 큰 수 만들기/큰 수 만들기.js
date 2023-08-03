function solution(number, k) {
  const stack = [];
  let deleteCount = 0;

  number.split('').forEach((digit) => {
    while (deleteCount < k && stack[stack.length - 1] < digit) {
      stack.pop();
      deleteCount += 1;
    }
    stack.push(digit);
  });

  while (deleteCount < k) {
    stack.pop();
    deleteCount += 1;
  }

  return stack.join('');
}