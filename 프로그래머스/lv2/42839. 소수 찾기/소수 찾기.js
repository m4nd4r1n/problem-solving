const solution = (numbers) => {
  const papers = numbers.split("");
  let count = 0;
  new Set(
    Array(numbers.length)
      .fill()
      .flatMap((_, index) =>
        permutation(papers, index + 1).map((number) => +number.join(""))
      )
  ).forEach((number) => {
    if (number < 2) return;
    if (number % 2 === 0) {
      if (number === 2) count += 1;
      return;
    }
    for (let index = 3; index <= Math.sqrt(number); index += 2) {
      if (number % index === 0) return;
    }
    count += 1;
  });
  return count;
};

const permutation = (array, length) =>
  length === 1
    ? array.map((value) => [value])
    : array.flatMap((choice, index, origin) =>
        permutation(
          origin.filter((_, idx) => idx !== index),
          length - 1
        ).map((value) => [choice, ...value])
      );
