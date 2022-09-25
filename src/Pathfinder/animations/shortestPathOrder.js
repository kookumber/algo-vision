export const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPath = []
    let currentNode = finishNode
    while (currentNode !== null) {
        nodesInShortestPath.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return nodesInShortestPath
}