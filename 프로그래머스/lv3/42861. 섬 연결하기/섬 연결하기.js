const COST = 2;

function solution(n, costs) {
  const sortedCosts = [...costs].sort((a, b) => a[COST] - b[COST]);
  const { union, find } = getUnionFind(n);

  return sortedCosts.reduce((sum, [a, b, cost]) => {
    if (find(a) !== find(b)) {
      union(a, b);
      return sum + cost;
    }
    return sum;
  }, 0);
}

const getUnionFind = (n) => {
  const parent = Array(n)
    .fill(0)
    .map((_, i) => i);

  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);
    parent[rootB] = rootA;
  };

  const find = (value) => {
    if (value === parent[value]) return value;
    return find(parent[value]);
  };

  return { union, find };
};