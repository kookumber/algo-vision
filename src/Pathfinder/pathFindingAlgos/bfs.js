import { getAllNodes, getUnvisitedNeighbors } from "../utils/nodesUtil"


export const bfs = (grid, startNode, finishNode) => {

    const visitedNodesInOrder = []
    const unvisitedNodes = getAllNodes(grid)
    const queue = [startNode]

    while (queue.length > 0) {
        const currentNode = queue.shift()
        
        if (currentNode.isWall || currentNode.isVisited) continue;
        if (currentNode === finishNode ) return visitedNodesInOrder;

        currentNode.isVisited = true

        let currentNodeNeighbors = getUnvisitedNeighbors(currentNode, grid)

        visitedNodesInOrder.push(currentNode)

        for (let neighbor of currentNodeNeighbors) {
            neighbor.distance = currentNode.distance + 1
            neighbor.previousNode = currentNode
            queue.push(neighbor)
        }
    }

    return visitedNodesInOrder

}