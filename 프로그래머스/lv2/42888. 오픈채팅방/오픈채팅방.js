function solution(record) {
  const answer = [];
  const nickname = [];

  for (const message of record) {
    const [act, uid, name] = message.split(" ");
    if (name) {
      nickname[uid] = name;
    }
    if (act === "Enter") {
      answer.push(`${uid}님이 들어왔습니다.`);
    } else if (act === "Leave") {
      answer.push(`${uid}님이 나갔습니다.`);
    }
  }
  for (let i = 0; i < answer.length; i++) {
    const [uid] = answer[i].split("님");
    answer[i] = answer[i].replace(uid, nickname[uid]);
  }
  return answer;
}
