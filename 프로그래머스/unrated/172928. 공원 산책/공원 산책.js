function solution(park, routes) {
  const startX = park.findIndex((row) => row.includes("S"));
  const startY = park[startX].indexOf("S");
  return routes.reduce(
    (position, route) => {
      const [direction, distance] = route.split(" ");

      return canGoNext(park, position, direction, parseInt(distance))
        ? addDistance(position, direction, parseInt(distance))
        : position;
    },
    [startX, startY]
  );
}

const canGoNext = (park, position, direction, distance) =>
  Array(parseInt(distance))
    .fill()
    .map((_, i) => {
      const [nextX, nextY] = addDistance(position, direction, i + 1);
      return (
        nextX >= 0 &&
        nextX < park.length &&
        nextY >= 0 &&
        nextY < park[0].length &&
        park[nextX][nextY] !== "X"
      );
    })
    .every((v) => v);

const addDistance = (position, direction, distance) => {
  const [x, y] = position;
  const directionMap = {
    E: [x, y + distance],
    W: [x, y - distance],
    S: [x + distance, y],
    N: [x - distance, y],
  };
  return directionMap[direction];
};