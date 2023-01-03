const VISIBLE_DIGITS = 4;
const MARK = "*";

const solution = (phone_number) =>
  `${MARK.repeat(phone_number.length - VISIBLE_DIGITS)}${phone_number.slice(
    -VISIBLE_DIGITS
  )}`;