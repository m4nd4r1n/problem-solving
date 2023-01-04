const solution = (s) =>
  s
    .split(" ")
    .map(
      (word) => `${word.charAt(0).toUpperCase()}${word.toLowerCase().slice(1)}`
    )
    .join(" ");