const ALPHABET = ["A", "E", "I", "O", "U"];

const solution = (word) =>
  Array(5).fill()
    .flatMap((_, index) => 
      product(ALPHABET, index + 1).map((letters) => letters.join(""))
    )
    .sort()
    .indexOf(word) + 1;

const product = (arr, r) => {
  if(r === 1) return arr.map((el) => [el])
	
  return arr.flatMap((choice, index, origin) => 
    product(origin, r - 1).map((el) => [choice, ...el])
  )
}