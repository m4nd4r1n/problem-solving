function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  const visited = {};

  const dfs = (word) => {
    visited[word] = true;
    const nextWords = words.filter((w) => {
      if (visited[w]) return false;
      let diffCount = 0;
      for (const [index, letter] of w.split("").entries()) {
        if (word[index] !== letter) diffCount += 1;
        if (diffCount > 1) return false;
      }
      return diffCount === 1;
    });

    if (nextWords.includes(target)) return 1;

    for (const nextWord of nextWords) {
      return dfs(nextWord) + 1;
    }
  };

  return dfs(begin);
}
