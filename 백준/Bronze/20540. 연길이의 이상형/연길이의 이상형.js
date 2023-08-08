const fs = require('fs');
const file = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(file).toString().trim().split('\n');

const mbti = input[0];

const mbtiMap = {
  E: 'I',
  I: 'E',
  S: 'N',
  N: 'S',
  T: 'F',
  F: 'T',
  J: 'P',
  P: 'J',
};

function solution(mbti) {
  console.log(mbti.split('').reduce((result, char) => `${result}${mbtiMap[char]}`, ''));
}

solution(mbti);
