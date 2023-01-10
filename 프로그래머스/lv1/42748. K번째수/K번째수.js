const solution = (array, commands) =>
  commands.map(
    ([offset1, offset2, target]) =>
      array.slice(offset1 - 1, offset2).sort((a, b) => a - b)[target - 1]
  );
