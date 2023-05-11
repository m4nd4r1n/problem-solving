/*
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function pangrams(s) {
  // Write your code here
  const alphabet = new Set(s.toLowerCase().replace(/\s/g, "").split(""));
  if (alphabet.size === 26) return "pangram";
  else return "not pangram";
}
