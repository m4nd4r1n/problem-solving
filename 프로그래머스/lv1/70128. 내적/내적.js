function solution(a, b) {
  let answer = 0;
  a.forEach((value, index) => {
    answer += value * b[index];
  });
  return answer;
}
