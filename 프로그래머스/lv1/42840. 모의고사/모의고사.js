function solution(answers) {
  const answer = [];
  const count = [0, 0, 0];
  const supo1 = [1, 2, 3, 4, 5];
  const supo2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const supo3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === supo1[i % 5]) count[0]++;
    if (answers[i] === supo2[i % 8]) count[1]++;
    if (answers[i] === supo3[i % 10]) count[2]++;
  }
  const max = Math.max(...count);
  if (count.indexOf(max) !== count.lastIndexOf(max)) {
    for (let i = 0; i < count.length; i++) {
      if (count[i] === max) answer.push(i + 1);
    }
  } else {
    answer.push(count.indexOf(max) + 1);
  }

  return answer;
}
