const solution = (players, callings) => {
    const playerMap = new Map();
    const rankMap = new Map();
    
    players.forEach((player, index)=>{
        playerMap.set(player, index+1)
        rankMap.set(index+1, player)
    })
    
    callings.forEach((call) => {
        const currentRank = playerMap.get(call)
        const nextRank = currentRank - 1
        playerMap.set(call, nextRank)
        playerMap.set(rankMap.get(nextRank), currentRank)
        rankMap.set(currentRank, rankMap.get(nextRank))
        rankMap.set(nextRank, call)
    })
    
    return [...rankMap.values()]
}