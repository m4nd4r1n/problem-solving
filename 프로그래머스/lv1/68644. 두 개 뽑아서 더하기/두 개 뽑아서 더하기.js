const solution = (numbers) =>
  Array.from(
    new Set(
      permutation(numbers, 2).map(([number1, number2]) => number1 + number2)
    )
  ).sort((a, b) => a - b);

const permutation = (array, length) =>
  length === 1
    ? array.map((value) => [value])
    : array.flatMap((choice, index, origin) =>
        permutation(
          origin.filter((_, idx) => idx !== index),
          length - 1
        ).map((value) => [choice, ...value])
      );