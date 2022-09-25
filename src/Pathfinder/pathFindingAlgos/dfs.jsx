export const dfs = (nodes, startNode, finishNode) => {

    const visitedNodesInOrder = []
    const nextNodesStack = []

    nextNodesStack.push(startNode)

    while(nextNodesStack.length > 0) {

        const currentNode = nextNodesStack.pop() // We'll pop (get last element) from the stack to track as our currentNode

        const {row, col, isWall, isVisited, isStart} = currentNode

        if (currentNode === finishNode) return visitedNodesInOrder // If the node we pop is equal to the finishNode, we know we finished following the path so we can return the visitedNodes

        // If not a wall and is a start node or a node we haven't visited yet, we'll set isVisited as true and push it into our vistiedNodes arr
        if (!isWall && (isStart || !isVisited)) {
            currentNode.isVisited = true
            visitedNodesInOrder.push(currentNode)

            let nextNode;
            // If row of currentNode > 0, we get the next node by indexing into nodes grid and set its' previous node as the current node
            // We'll also push into the stack the nextNode since we visited it
            if (row > 0) {
                nextNode = nodes[row - 1][col]
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode
                    nextNodesStack.push(nextNode)
                }
            }

            if (row < nodes.length - 1) {
                nextNode = nodes[row + 1][col]
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode
                    nextNodesStack.push(nextNode)
                }
            }

            if (col > 0) {
                nextNode = nodes[row][col - 1]
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode
                    nextNodesStack.push(nextNode)
                }
            }

            if (col < nodes[0].length - 1) {
                nextNode = nodes[row][col + 1]
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode
                    nextNodesStack.push(nextNode)
                }
            }
        }
    }  
}