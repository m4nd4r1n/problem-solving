const solution = (clothes) => {
  const clothMap = {};
  clothes.forEach((cloth) => {
    const [, type] = cloth;
    if (clothMap[type]) clothMap[type] += 1;
    else clothMap[type] = 1;
  });
  return (
    Object.values(clothMap).reduce((prev, curr) => prev * (curr + 1), 1) - 1
  );
};