function getDist(start, end) {
  return Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
}

function solution(numbers, hand) {
  let answer = "";
  const coords = [
    [3, 1],
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];
  coords["*"] = [3, 0];
  coords["#"] = [3, 2];
  let left = "*",
    right = "#";
  for (const number of numbers) {
    if ([1, 4, 7].includes(number)) {
      answer += "L";
      left = number;
    } else if ([3, 6, 9].includes(number)) {
      answer += "R";
      right = number;
    } else {
      if (
        getDist(coords[left], coords[number]) >
        getDist(coords[right], coords[number])
      ) {
        answer += "R";
        right = number;
      } else if (
        getDist(coords[left], coords[number]) <
        getDist(coords[right], coords[number])
      ) {
        answer += "L";
        left = number;
      } else {
        if (hand === "right") {
          answer += "R";
          right = number;
        } else {
          answer += "L";
          left = number;
        }
      }
    }
  }
  return answer;
}
