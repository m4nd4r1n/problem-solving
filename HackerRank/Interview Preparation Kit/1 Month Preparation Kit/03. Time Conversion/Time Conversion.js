/*
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {
  // Write your code here
  const meridiem = s.slice(8);
  const time = s.slice(0, 8);
  const [hour, minute, second] = time.split(":");
  const meridiemMap = {
    AM: () => {
      if (hour === "12") return `00:${minute}:${second}`;
      return time;
    },
    PM: () => {
      if (hour === "12") return time;
      return `${+hour + 12}:${minute}:${second}`;
    },
  };
  return meridiemMap[meridiem]();
}
