const solution = (s) => {
  if (s.length === 1 || s[0] === ")") return false;
  let remain = 0;
  const bracketMap = {
    "(": () => (remain += 1),
    ")": () => (remain -= 1),
  };
  for (const bracket of s) {
    bracketMap[bracket]();
    if (remain < 0) return false;
  }
  return remain === 0;
};