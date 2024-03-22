const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const dice = input[0].split(' ').map(Number);

  console.log(solution(dice));
});

const NODES = 33;
const ARRIVAL = 21;

const solution = (dice) => {
  const [graph, scores] = getGraphAndScores();
  const pieces = [0, 0, 0, 0];

  return find(0, dice, pieces, graph, scores);
};

const find = (step, dice, pieces, graph, scores) => {
  if (step === dice.length) return 0;

  let score = 0;

  for (let i = 0; i < pieces.length; i++) {
    const current = pieces[i];
    const next = move(current, dice[step], graph);
    if (next !== ARRIVAL && pieces.includes(next)) continue;

    pieces[i] = next;
    score = Math.max(score, find(step + 1, dice, pieces, graph, scores) + scores[next]);
    pieces[i] = current;
  }

  return score;
};

const move = (start, moveCount, graph) => {
  if (start === ARRIVAL) return start;

  const startNode = graph[start];
  let [dest] = startNode;

  if (startNode.length > 1) {
    [, dest] = startNode;
  }

  while (--moveCount && dest !== ARRIVAL) {
    [dest] = graph[dest];
  }

  return dest;
};

const getGraphAndScores = () => {
  const graph = Array.from(Array(NODES), () => Array());
  const scores = Array(NODES).fill(0);
  const score22to26 = [13, 16, 19, 25, 30];

  for (let i = 0; i < 21; i++) {
    graph[i].push(i + 1);
    scores[i] = 2 * i;
  }

  graph[5].push(22);
  for (let i = 22; i <= 26; i++) {
    graph[i].push(i + 1);
    scores[i] = score22to26[i - 22];
  }
  graph[27].push(20);
  scores[27] = 35;

  graph[10].push(28);
  graph[28].push(29);
  graph[29].push(25);
  scores[28] = 22;
  scores[29] = 24;

  graph[15].push(30);
  graph[30].push(31);
  graph[31].push(32);
  graph[32].push(25);
  scores[30] = 28;
  scores[31] = 27;
  scores[32] = 26;

  return [graph, scores];
};
