import { getAllNodes, sortNodesByDistance, updateUnvisitedNeighbors } from "../utils/nodesUtil"


export const dijkstrasAlgo = (grid, startNode, finishNode) => {

    const visitedNodesInOrder = []
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid)

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes)

        const closestNode = unvisitedNodes.shift()
        // If 
        if (closestNode.isWall === false) {
            if (closestNode.distance === Infinity) return visitedNodesInOrder

            closestNode.isVisited = true
            visitedNodesInOrder.push(closestNode)

            if (closestNode === finishNode) return visitedNodesInOrder;
            updateUnvisitedNeighbors(closestNode, grid)
        }
    }
}

