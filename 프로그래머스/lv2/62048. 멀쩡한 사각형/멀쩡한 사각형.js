function GCD(a, b) {
  if (a > b) {
    while (1) {
      let r = a % b;
      if (r === 0) return b;

      a = b;
      b = r;
    }
  } else {
    while (1) {
      let r = b % a;
      if (r === 0) return a;

      b = a;
      a = r;
    }
  }
}

function solution(w, h) {
  return w * h - (w + h - GCD(w, h));
}
