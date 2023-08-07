function solution(gems) {
  let start = 0;
  let end = 0;
  let result = [0, gems.length];

  const gemKinds = new Set(gems).size;
  const gemLength = gems.length;
  const map = new Map();
  map.set(gems[start], 1);

  while (start < gemLength && end < gemLength) {
    if (map.size !== gemKinds) {
      end += 1;
      const endGemCount = map.get(gems[end]) || 0;
      map.set(gems[end], endGemCount + 1);
    } else {
      const startGemCount = map.get(gems[start]);
      map.set(gems[start], startGemCount - 1);
      if (map.get(gems[start]) === 0) map.delete(gems[start]);

      const [minStart, minEnd] = result;
      if (end - start < minEnd - minStart) result = [start + 1, end + 1];

      start += 1;
    }
  }

  return result;
}