function solution(progresses, speeds) {
  var answer = [];
  let current = 0;
  let count = 0;
  while (current !== progresses.length) {
    if (progresses[current] >= 100) {
      current++;
      count++;
    }
    while (progresses[current] < 100) {
      if (count !== 0) {
        answer.push(count);
        count = 0;
      }
      for (let i = 0; i < progresses.length; i++) {
        progresses[i] += speeds[i];
      }
    }
  }
  if (count !== 0) {
    answer.push(count);
    count = 0;
  }

  return answer;
}
