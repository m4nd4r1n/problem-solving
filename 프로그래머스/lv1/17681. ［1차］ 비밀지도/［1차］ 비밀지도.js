const solution = (n, arr1, arr2) =>
  arr1.map((number1, index) =>
    (number1 | arr2[index])
      .toString(2)
      .padStart(n, 0)
      .replace(/0/g, " ")
      .replace(/1/g, "#")
  );