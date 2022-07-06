function winCalculator(num) {
  switch (num) {
    case 6:
      return 1;
    case 5:
      return 2;
    case 4:
      return 3;
    case 3:
      return 4;
    case 2:
      return 5;
    default:
      return 6;
  }
}

function solution(lottos, win_nums) {
  const answer = [];
  const zeros = lottos.filter((x) => x === 0);
  const wins = lottos.filter((x) => win_nums.includes(x));
  const max = winCalculator(wins.length + zeros.length);
  const min = winCalculator(wins.length);
  answer.push(max, min);
  return answer;
}
