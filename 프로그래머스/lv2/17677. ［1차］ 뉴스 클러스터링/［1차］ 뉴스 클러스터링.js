const MULTIPLE = 2 ** 16;

const solution = (str1, str2) => {
  const [multiset1, multiset2] = [makeMultiset(str1), makeMultiset(str2)];
  const intersectionSize = getIntersectionSize(multiset1, multiset2);
  const unionSize = multiset1.length + multiset2.length - intersectionSize;
  const J = intersectionSize / unionSize;

  return Math.floor((isNaN(J) ? 1 : J) * MULTIPLE);
};

const makeMultiset = (str) =>
  str
    .toLowerCase()
    .split("")
    .map((alphabet, index, array) => {
      if (index === str.length - 1) return;
      return `${alphabet}${array[index + 1]}`;
    })
    .filter(Boolean)
    .filter((element) => !/\W|[0-9]|_/g.test(element));

const getIntersectionSize = (set1, set2) => {
  const copiedSet2 = [...set2];

  return set1.reduce((size, element) => {
    if (copiedSet2.includes(element)) {
      copiedSet2.splice(copiedSet2.indexOf(element), 1);
      return size + 1;
    }
    return size;
  }, 0);
};