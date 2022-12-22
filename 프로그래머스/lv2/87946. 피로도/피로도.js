const solution = (k, dungeons) =>
  permutation(dungeons, dungeons.length).reduce((maxCount, dungeonList) => {
    let fatigue = k;
    const dungeonCount = dungeonList.reduce((count, [min, consume]) => {
      if (min > fatigue) return count;
      fatigue -= consume;
      return count + 1;
    }, 0);
    return maxCount < dungeonCount ? dungeonCount : maxCount;
  }, 0);

const permutation = (array, length) =>
  length === 1
    ? array.map((value) => [value])
    : array.flatMap((choice, index, origin) =>
        permutation(
          origin.filter((_, idx) => idx !== index),
          length - 1
        ).map((value) => [choice, ...value])
      );