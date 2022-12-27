const solution = (survey, choices) => {
  const characterMap = { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 };
  survey.forEach((type, index) => {
    const [character] = type;
    characterMap[character] += 4 - choices[index];
  });
  return `${characterMap["R"] >= characterMap["T"] ? "R" : "T"}${
    characterMap["C"] >= characterMap["F"] ? "C" : "F"
  }${characterMap["J"] >= characterMap["M"] ? "J" : "M"}${
    characterMap["A"] >= characterMap["N"] ? "A" : "N"
  }`;
};