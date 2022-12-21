const solution = (nums) => {
  const typeSet = new Set(nums);
  const max = Math.floor(nums.length / 2);
  if (typeSet.size < max) return typeSet.size;
  return Math.floor(max);
};