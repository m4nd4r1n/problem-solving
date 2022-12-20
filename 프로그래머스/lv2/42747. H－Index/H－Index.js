const solution = (citations) => {
  const sorted = citations.sort((a, b) => a - b);
  for (const citation of sorted) {
    const hIndex = sorted.length - sorted.indexOf(citation);
    if (citation >= hIndex) return hIndex;
  }
  return 0;
};