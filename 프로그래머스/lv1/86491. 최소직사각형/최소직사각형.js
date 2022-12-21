const solution = (sizes) => {
  const orderedSizes = sizes.map(([width, height]) =>
    width < height ? [height, width] : [width, height]
  );
  const widths = orderedSizes.map(([width]) => width);
  const heights = orderedSizes.map(([, height]) => height);

  return Math.max(...widths) * Math.max(...heights);
};