const ALPHABET = ["A", "E", "I", "O", "U"];

const solution = (word) =>
  ALPHABET
    .flatMap((_, index, origin) =>
      product(origin, index + 1).map((letters) => letters.join(""))
    )
    .sort()
    .indexOf(word) + 1;

const product = (array, length) =>
  length === 1
    ? array.map((value) => [value])
    : array.flatMap((choice, _, origin) =>
        product(origin, length - 1).map((value) => [choice, ...value])
      );