function solution(new_id) {
  var answer = "";

  answer = new_id
    .toLowerCase()
    .replace(/[^a-z0-9-_.]/g, "")
    .replace(/\.{2,}/g, ".")
    .replace(/^\.|\.$/g, "");

  if (answer.length === 0) {
    answer = answer.concat("a");
  }
  if (answer.length >= 16) {
    answer = answer.slice(0, 15).replace(/\.$/g, "");
  }

  while (answer.length <= 2) {
    answer = answer.concat(answer[answer.length - 1]);
  }

  return answer;
}
