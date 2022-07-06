function chunkSubstr(str, size) {
  return str.match(new RegExp(`.{1,${size}}`, "g"));
}

function solution(s) {
  const orgLen = s.length;
  const resultLen = [];
  for (let i = 1; i < s.length; i++) {
    const sliced = chunkSubstr(s, i);
    let same = false;
    let result = "";
    let cnt = 0;
    for (let j = 0; j < sliced.length - 1; j++) {
      if (j == 0) result += sliced[j];
      if (sliced[j] === sliced[j + 1]) {
        cnt++;
        if (!same) result += "0";
        if (cnt.toString().length !== (cnt + 1).toString().length)
          result += "0";
        same = true;
      } else {
        same = false;
        result += sliced[j + 1];
        cnt = 0;
      }
    }
    resultLen[i - 1] = result.length;
  }
  if (s.length === 1) resultLen.push(1);
  return Math.min(...resultLen);
}
