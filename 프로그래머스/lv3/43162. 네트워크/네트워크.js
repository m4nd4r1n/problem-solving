const CONNECTED = 1;

function solution(n, computers) {
  const visited = [false];
    
  const dfs = (current) => {
    visited[current] = true;
    computers[current].forEach((connect, next) => {
      if(connect === CONNECTED && !visited[next]) dfs(next);
    })
  }
    
  return computers.reduce((count, _, current) => {
    if(visited[current]) return count;
    dfs(current);
    return count + 1;
  }, 0)
}