function solution(numbers) {
  let answer = 45;
  for (const number of numbers) {
    answer -= number;
  }
  return answer;
}
