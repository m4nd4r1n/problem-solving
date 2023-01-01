const solution = (N, stages) =>
  Array(N)
    .fill()
    .map((_, index) => {
      const failure =
        stages.filter((stage) => stage === index + 1).length / stages.length;
      stages = stages.filter((stage) => stage !== index + 1);
      return { index, failure };
    })
    .sort((a, b) => b.failure - a.failure)
    .map((stage) => stage.index + 1);