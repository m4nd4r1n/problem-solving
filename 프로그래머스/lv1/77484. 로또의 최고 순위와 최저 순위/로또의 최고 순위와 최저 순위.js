const solution = (lottos, win_nums) => {
  const calculator = [6, 6, 5, 4, 3, 2, 1];
  const zeros = lottos.filter((x) => x === 0);
  const wins = lottos.filter((x) => win_nums.includes(x));
  const max = calculator[wins.length + zeros.length];
  const min = calculator[wins.length];
  return [max, min];
};
