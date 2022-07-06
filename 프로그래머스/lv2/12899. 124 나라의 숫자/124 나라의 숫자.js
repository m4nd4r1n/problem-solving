function solution(n) {
  if (n < 3) return n + "";

  let answer = "";
  const nara = [4, 1, 2];

  while (n > 0) {
    const remainder = n % 3;
    n = parseInt(n / 3);
    if (remainder === 0) n--;
    answer = nara[remainder] + answer;
  }

  return answer;
}