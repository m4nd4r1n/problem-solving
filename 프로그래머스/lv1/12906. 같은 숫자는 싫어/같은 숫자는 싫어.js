const solution = (arr) => {
  const stack = [];
  arr.forEach((number) => {
    if (stack[stack.length - 1] !== number) stack.push(number);
  });
  return stack;
};