const solution = (a, b) =>
  a.reduce((answer, value, index) => (answer += value * b[index]), 0);
