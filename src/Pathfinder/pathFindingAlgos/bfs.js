
export const bfs = (grid, startNode, finishNode) => {

    // We'll return visitedNodesInOrder for purpose of animating on the grid all the nodes visited
    const visitedNodesInOrder = [] 
    
    // For BFS, we'll use a queue to explore nodes at present depth prior to moving to next depth level
    const queue = [startNode]

    while (queue.length > 0) {
        const currentNode = queue.shift()
        
        // So we don't try to visit a wall or add nodes we already visited, 
        // we'll start the while loop over if node is wall or already visited
        if (currentNode.isWall || currentNode.isVisited) continue;

        // If we hit the finishNode given, we don't need to explore anymore
        if (currentNode === finishNode ) return visitedNodesInOrder;

        currentNode.isVisited = true

        // Unvisited neighbors will be nodes the top, bottom, left, and right of the current node
        let currentNodeNeighbors = getUnvisitedNeighbors(currentNode, grid)
        visitedNodesInOrder.push(currentNode)

        // Here we loop through current neighbors and push to queue
        for (let neighbor of currentNodeNeighbors) {
            neighbor.distance = currentNode.distance + 1
            neighbor.previousNode = currentNode
            queue.push(neighbor)
        }
    }

    return visitedNodesInOrder

}

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = []
    const { row, col } = node

    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    
    return neighbors.filter(neighbor => neighbor.isVisited === false)
}