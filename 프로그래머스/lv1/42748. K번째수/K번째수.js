function solution(array, commands) {
  const answer = [];
  for (const command of commands) {
    const sliced = array.slice(command[0] - 1, command[1]);

    sliced.sort((a, b) => a - b);
    console.log(sliced);
    answer.push(sliced[command[2] - 1]);
  }
  return answer;
}
