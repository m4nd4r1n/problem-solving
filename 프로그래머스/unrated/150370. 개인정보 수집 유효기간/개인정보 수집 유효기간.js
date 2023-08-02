function solution(today, terms, privacies) {
  const termsMap = terms.reduce((map, term) => {
    const [type, validity] = term.split(" ");
    map.set(type, parseInt(validity));
    return map;
  }, new Map());

  return privacies
    .map((privacy, index) => {
      const [date, type] = privacy.split(" ");
      const validity = termsMap.get(type);
      const todayDate = stringToDate(today);
      const expiryDate = stringToDateWithAddMonths(date, validity);
      if (expiryDate.getDate() > 28) expiryDate.setDate(28);
      return todayDate > expiryDate ? index + 1 : null;
    })
    .filter(Boolean);
}

const stringToDate = (string) => {
  const [year, month, day] = string.split(".");
  return new Date(Date.UTC(year, month - 1, day));
};

const stringToDateWithAddMonths = (string, months) => {
  const [year, month, day] = string.split(".");
  return new Date(Date.UTC(year, month - 1 + months, day - 1));
};