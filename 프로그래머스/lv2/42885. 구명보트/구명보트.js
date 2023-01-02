const solution = (people, limit) => {
  let boat = 0,
    left = 0,
    right = people.length - 1;

  people.sort((a, b) => a - b);

  while (left < right) {
    const sum = people[left] + people[right];
    if (sum > limit) right--;
    else {
      right--;
      left++;
    }
    boat++;
  }
  return left == right ? boat + 1 : boat;
};