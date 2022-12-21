const solution = (priorities, location) => {
  const queue = priorities.map((priority, index) => ({ priority, index }));
  let count = 0;
  while (queue.length) {
    if (
      queue[0].priority === Math.max(...queue.map((value) => value.priority))
    ) {
      count += 1;
      if (queue[0].index === location) return count;
      queue.shift();
      continue;
    }
    queue.push(queue.shift());
  }
};