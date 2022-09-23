export const generateBasicMaze = (nodes) => {
    nodes.forEach((row, idxRow) => {
        row.forEach((node, idxCol) => {
            const { row, col, isStart, isFinish } = node

            let randomNum = Math.random()
            // let currentHTMLNode = document.getElementById(`node-${row}-${col}`)
            // console.log(currentHTMLNode)
            let randomNumTwo = node.isWall ? 0.175 : 0.25

            if (randomNum < randomNumTwo && !isStart && !isFinish) {
                nodes[idxRow][idxCol].isWall = true
                document.getElementById(`node-${row}-${col}`).className = 'node node-wall'
            }
        })
    })
}
