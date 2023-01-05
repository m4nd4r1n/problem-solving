const solution = (s) => {
  let binary = s,
    convertCount = 0,
    zeroCount = 0;
  while (binary !== "1") {
    convertCount += 1;
    zeroCount += binary.split("0").length - 1;
    binary = binary.replace(/0/g, "").length.toString(2);
  }
  return [convertCount, zeroCount];
};