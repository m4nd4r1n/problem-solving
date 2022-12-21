const solution = (genres, plays) => {
  const genreMap = new Map();
  genres.forEach((genre, index) => {
    if (genreMap.has(genre)) {
      genreMap.get(genre).total += plays[index];
      genreMap.get(genre).songs.push({ index, play: plays[index] });
      return;
    }
    genreMap.set(genre, {
      total: plays[index],
      songs: [{ index, play: plays[index] }],
    });
  });
  const genreArray = Array.from(genreMap);
  genreArray.sort((a, b) => b[1].total - a[1].total);
  genreArray.forEach(([, value]) => {
    value.songs.sort((a, b) => b.play - a.play);
  });
  return genreArray.flatMap(([, value]) =>
    value.songs[1]
      ? [value.songs[0].index, value.songs[1].index]
      : [value.songs[0].index]
  );
};