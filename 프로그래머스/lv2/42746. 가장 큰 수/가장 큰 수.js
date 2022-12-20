const solution = (numbers) => {
  const isZero = numbers.every((number) => !number);
  if (isZero) return "0";
  const result = numbers
    .sort((a, b) => (`${a}${b}` < `${b}${a}` ? 1 : -1))
    .join("");
  return result;
};