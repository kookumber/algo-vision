// export const generateRecursiveMaze = (nodes, rowStart, rowEnd, colStart, colEnd) => {
    
//     if (rowEnd < rowStart || colEnd < colStart) return
    
//     let possibleRows = []
    
//     for (let num = rowStart; num <= rowEnd; num += 2) {
//         possibleRows.push(num)
//     }

//     let possibleCols = []
//     for (let num = colStart - 1; num <= colEnd; num += 2) {
//         possibleCols.push(num)
//     }

//     let randomRowIndex = Math.floor(Math.random() * possibleRows.length)
//     let randomColIndex = Math.floor(Math.random() * possibleCols.length)
//     let currentRow = possibleRows[randomRowIndex]
//     let colRandom = possibleCols[randomColIndex]

//     nodes.forEach(row => {
//         row.forEach(node => {
//             const { isStart, isFinish, isWall } = node
//             let r = node.row
//             let c = node.col
//             if (r === currentRow && c !== colRandom && c >= colStart - 1 && c <= colEnd + 1) {
//                 let currentHTMLNode = document.getElementById(`node-${r}-${c}`)
//                 if (!isStart && !isFinish && !isWall) {
//                     node.isWall = true
//                     currentHTMLNode.className = 'node node-wall'
//                 }
//             }
//         })
//     })
//     console.log("curRow", currentRow - 2 - rowStart) 
//     console.log("rowStart", colEnd - colStart)
    
//     generateRecursiveMaze(nodes, rowStart, currentRow - 2, colStart, colEnd)
    

    

//     // if (rowEnd - (currentRow + 2) > colEnd - colStart) {
//     //     generateRecursiveMaze(nodes, currentRow + 2, rowEnd, colStart, colEnd)
//     // }

// }

// // const generateSurroundingWalls = (nodes, rowStart, rowEnd, colStart, colEnd) => {

// //     if (rowEnd < rowStart || colEnd < colStart) {
// //         return
// //     }

// //     let untouchableNodes = []
// //     nodes.forEach(row => {
// //         row.forEach(node => {
// //             if ()
// //         })
// //     })
// // }