const solution = (brown, yellow) =>
  Array(brown + yellow)
    .fill()
    .map((_, width) => {
      const sum = brown + yellow;
      const height = sum / width;
      if (sum % width === 0 && width >= height) {
        return [width, height];
      }
    })
    .filter(Boolean)
    .find(([width, height]) => (width - 2) * (height - 2) === yellow);