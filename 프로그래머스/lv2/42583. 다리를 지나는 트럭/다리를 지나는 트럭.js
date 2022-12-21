const solution = (bridge_length, weight, truck_weights) => {
  const queue = [];
  let second = 0;
  const secondPerTrucks = [];
  while (truck_weights.length || queue.length) {
    const newQueue = queue.filter(
      (_, index) => secondPerTrucks[index] <= bridge_length
    );
    const newSecondPerTrucks = secondPerTrucks.filter(
      (second) => second <= bridge_length
    );
    secondPerTrucks.length = 0;
    secondPerTrucks.push(...newSecondPerTrucks);
    queue.length = 0;
    queue.push(...newQueue);
    if (
      truck_weights.length &&
      queue.reduce((prev, curr) => prev + curr, 0) + truck_weights[0] <= weight
    ) {
      queue.push(truck_weights.shift());
      secondPerTrucks.push(1);
    }
    const addSecondPerTrucks = secondPerTrucks.map((second) => second + 1);
    secondPerTrucks.length = 0;
    secondPerTrucks.push(...addSecondPerTrucks);
    second += 1;
  }
  return second;
};