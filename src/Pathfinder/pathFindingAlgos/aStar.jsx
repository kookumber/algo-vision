import { getUnvisitedNeighbors } from "../utils/nodesUtil"

export const aStar = (nodes, startNode, finishNode) => {

    let openList = []
    let closedList = []
    
    startNode.distance = 0
    startNode.totalDistance = 0
    
    openList.push(startNode)

    while (openList.length > 0) {
        // Grab the lowest f(x) or the closest node to process next
        let currentNode = findClosestNode(openList)

        // End case -- result has been found, return the traced path
        if (currentNode === finishNode) {
            return closedList
        }

        if (currentNode.distance === Infinity) {
            return closedList
        }

        openList = removeFromArr(currentNode, openList)

        if (currentNode.isWall) continue;

        currentNode.isVisited = true
        updateNeighbors(currentNode, nodes, openList, closedList, finishNode)
        closedList.push(currentNode)
    }
    return closedList;
}


const findClosestNode = (openList) => {
    let currentClosest;
    let idx;
    for (let i = 0; i < openList.length; i++) {
        if( !currentClosest || currentClosest.totalDistance > openList[i].totalDistance) {
            currentClosest = openList[i]
            idx = i;
        } else if (currentClosest.totalDistance === openList[i].totalDistance) {
            if (currentClosest.heuristic > openList[i].heuristic) {
                currentClosest = openList[i]
                idx = 1
            }
        }
    }
    openList.splice(idx, 1)
    return currentClosest
}

const updateNeighbors = (node, grid, openList, closedList, finishNode ) => {
    let unvisitedNeighbors = getUnvisitedNeighbors(node, grid)

    for (let neighbor of unvisitedNeighbors) {
        if (!closedList.includes(neighbor)) {
            let temp = node.distance + 1;
            let newPath = false
            if (openList.includes(neighbor)) {
                if (temp < neighbor.distance) {
                    neighbor.distance = temp
                    newPath = true
                }
                openList.push(neighbor)
            } else {
                neighbor.distance = temp
                openList.push(neighbor)
                newPath = true
            }

            if (newPath) {
                neighbor.heuristic = manhattanDistance(neighbor, finishNode)
                neighbor.totalDistance = neighbor.distance + neighbor.heuristic
                neighbor.previousNode = node
            }
        }
    }
}

const removeFromArr = (node, list) => {
    let newOpenList = [];
    for (let i = 0; i < list.length; i++) {
        if (node !== list[i]) {
            newOpenList.push(list[i])
        }
    }
    return newOpenList
}

const manhattanDistance = (nodeOne, nodeTwo) => {
    let x = Math.abs(nodeOne.row - nodeTwo.row)
    let y = Math.abs(nodeOne.col - nodeTwo.col)

    return x + y;
}