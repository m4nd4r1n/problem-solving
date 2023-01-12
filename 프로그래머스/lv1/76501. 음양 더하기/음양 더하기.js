const solution = (absolutes, signs) =>
  signs.reduce(
    (answer, sign, index) =>
      sign ? (answer += absolutes[index]) : (answer -= absolutes[index]),
    0
  );
