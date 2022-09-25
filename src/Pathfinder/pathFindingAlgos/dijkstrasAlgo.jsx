
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

const getAllNodes = (grid) => {
    const nodes = []
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node)
        }
    }
    return nodes
}

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1
        neighbor.previousNode = node;
    }
}

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = []
    const { row, col } = node
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    return neighbors.filter(neighbor => neighbor.isVisited === false )
}

