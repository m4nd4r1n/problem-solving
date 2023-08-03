const solution = (cacheSize, cities) => {
  if (cacheSize === 0) return cities.length * 5;
  const cache = [];

  return cities.reduce((time, city) => {
    const lowercaseCity = city.toLowerCase();
    const targetCacheIndex = cache.indexOf(lowercaseCity);
    if (targetCacheIndex !== -1) {
      cache.splice(targetCacheIndex, 1);
      cache.push(lowercaseCity);
      return time + 1;
    }
    if (cache.length === cacheSize) cache.shift();
    cache.push(lowercaseCity);
    return time + 5;
  }, 0);
};