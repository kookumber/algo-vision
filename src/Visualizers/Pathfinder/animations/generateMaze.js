// export const generateBasicMaze = (grid) => {
//     // console.log(nodes)
//     grid.forEach((row, idx) => {
//         row.forEach(node => {
//             const { row, col, isStart, isFinish, isWall } = node
            
//             let randomNum = Math.random()
//             let currentHTMLNode = document.getElementById(`node-${row}-${col}`)
//             // console.log(currentHTMLNode)
//             let randomNumTwo = node.isWall ? 0.25 : 0.35
    
//             if (randomNum < randomNumTwo && !node.isStart && !node.isFinish) {
                
//                 document.getElementById(`node-${row}-${col}`).className = 'node node-wall'
//             }
//         })
//     })
// }