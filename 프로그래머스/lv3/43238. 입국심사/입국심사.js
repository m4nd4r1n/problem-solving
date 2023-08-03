function solution(n, times) {
  let leftTime = 1;
  let rightTime = Math.max(...times) * n;

  while (leftTime <= rightTime) {
    const midTime = Math.floor((leftTime + rightTime) / 2);
    const entrantsPerExaminer = times.reduce((sum, time) => sum + Math.floor(midTime / time), 0);
    if (entrantsPerExaminer < n) {
      leftTime = midTime + 1;
    } else {
      rightTime = midTime - 1;
    }
  }

  return leftTime;
}