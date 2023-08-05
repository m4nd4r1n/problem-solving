function solution(phone_book) {
  phone_book.sort();

  for (const [index, phone] of phone_book.entries()) {
    const nextPhone = phone_book[index + 1];
    if (nextPhone && nextPhone.startsWith(phone)) return false;
  }

  return true;
}