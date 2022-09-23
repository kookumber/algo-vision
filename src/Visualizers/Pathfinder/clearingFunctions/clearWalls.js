export const clearWalls = (nodes, finishNodeRow, finishNodeCol) => {
    nodes.forEach(row => {
        row.forEach(node => {
            const { row, col, isWall } = node
            
            let nodeHTMLElement = document.getElementById(`node-${row}-${col}`)
            if (isWall) {
                nodeHTMLElement.className = 'node'
                node.isVisited = false
                node.isWall = false
                node.distance = Infinity
                node.distanceToFinishNode = Math.abs(finishNodeRow - row) + Math.abs(finishNodeCol - col)
            }
        })
    })
}