export const clearGrid = (nodes, finishNodeRow, finishNodeCol) => {
    nodes.forEach((row) => {
        row.forEach((node) => {

            const { row, col, isStart, isFinish, isWall } = node
            let nodeHTMLElement = document.getElementById(`node-${row}-${col}`)
            if (!isStart && !isFinish & !isWall) {
                nodeHTMLElement.className = 'node'
                node.isVisited = false
                node.isWall = false
                node.distance = Infinity
                node.distanceToFinishNode = Math.abs(finishNodeRow - row) + Math.abs(finishNodeCol - col)
            }

            if (isFinish) {
                node.isVisited = false
                node.distance = Infinity
                node.distanceToFinishNode = 0
            }
            if (isStart) {
                node.isVisited = false;
                node.distance = Infinity;
                node.distanceToFinishNode = Math.abs(finishNodeRow - row) + Math.abs(finishNodeCol - col)
                node.isStart = true
                node.isWall = false
                node.previousNode = null;
                node.isNode = true
            }
        })
    })
}