function solution(id_list, report, k) {
  const answer = [];
  const reported = {};
  const reportSum = {};
  for (const item of report) {
    const arr = item.split(" ");
    if (reported[arr[0]] === undefined) {
      reported[arr[0]] = new Set([arr[1]]);
    } else {
      reported[arr[0]].add(arr[1]);
    }
  }

  for (const id in reported) {
    for (const item of reported[id]) {
      reportSum[item] ? reportSum[item]++ : (reportSum[item] = 1);
    }
  }

  for (const i in id_list) {
    if (reported[id_list[i]] === undefined) {
      answer[i] = 0;
      continue;
    }
    for (const id in reportSum) {
      if (reportSum[id] >= k && reported[id_list[i]].has(id)) {
        answer[i] ? answer[i]++ : (answer[i] = 1);
      }
    }
    if (answer[i] === undefined) answer[i] = 0;
  }
  return answer;
}