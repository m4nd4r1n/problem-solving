const solution = (numbers, target) => {
  let result = 0;
  const dfs = (index, sum, isPlus) => {
    isPlus ? (sum += numbers[index++]) : (sum -= numbers[index++]);
    if (numbers.length !== index) {
      dfs(index, sum, true);
      dfs(index, sum, false);
      return;
    }
    if (sum === target) result++;
  };
  dfs(0, 0, true);
  dfs(0, 0, false);
  return result;
};