function solution(words) {
  const trie = new Trie();

  words.forEach((word) => {
    trie.insert(word);
  });

  return words.reduce((answer, word) => {
    let count = 0;
    let current = trie.root;

    for (const letter of word) {
      count += 1;
      if (current[letter].count <= 1) break;
      current = current[letter].children;
    }

    return answer + count;
  }, 0);
}

class Trie {
  constructor() {
    this.root = {};
  }

  insert(string) {
    let current = this.root;

    string.split('').forEach((letter) => {
      if (!current[letter]) current[letter] = { count: 0, children: {} };
      current[letter].count += 1;
      current = current[letter].children;
    });
  }
}