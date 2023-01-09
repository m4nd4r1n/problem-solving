const solution = (participant, completion) => {
  const completionMap = completion.reduce((map, name) => {
    if (map[name]) map[name] += 1;
    else map[name] = 1;
    return map;
  }, {});

  return participant.find((name) => {
    if (completionMap[name]) completionMap[name] -= 1;
    else return !completionMap[name];
  });
};
