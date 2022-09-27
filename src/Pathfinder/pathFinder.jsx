import React from "react";
import Node from "./Node/node";
import './pathFinder.scss'
import { dijkstrasAlgo } from "./pathFindingAlgos/dijkstrasAlgo";
import { generateBasicMaze } from "./mazeAlgos/basicMaze";
import { createNode } from "./Node/createNodeObject";
import { clearGrid } from "./clearingFunctions/clearGrid";
import { clearWalls } from "./clearingFunctions/clearWalls"
import { getNodesInShortestPathOrder } from "./utils/shortestPathOrder";
import { dfs } from "./pathFindingAlgos/dfs";
import { aStar } from "./pathFindingAlgos/aStar";
// import { generateRecursiveMaze } from "./mazeAlgos/recursiveMaze"

export default class PathFinder extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nodes: [],
            graphSize: 24,
            startNodeCol: 3,
            startNodeRow: 6,
            finishNodeCol: 15,
            finishNodeRow: 39,
            mouseIsPressed: false
        }
    }

    componentDidMount(){
        this.generateNodes(this.state.graphSize)
    }

    animateShortestPath(nodesInShortestPath) {
        for (let i = 0; i < nodesInShortestPath.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPath[i]
                const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className
                if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'
                }
            }, 25 * i)
        }
    }

    animatePathfinder(visitedNodesInOrder, nodesInShortestPath) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPath)
                }, 5 * i)
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className
                if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish'){
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
                }
            }, 5 * i)
        }
    }

    visualizePathfinder(algo) {
        const {nodes, startNodeCol, startNodeRow, finishNodeCol, finishNodeRow } = this.state
        const startNode = nodes[startNodeRow][startNodeCol]
        const finishNode = nodes[finishNodeRow][finishNodeCol]
        const visitedNodesInOrder = algo(nodes, startNode, finishNode)
        const nodesInShortestPath = getNodesInShortestPathOrder(finishNode)
        this.animatePathfinder(visitedNodesInOrder, nodesInShortestPath)
    }   

    generateNodes(graphSize) {
        const nodesArr = []
        const { startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state
        for(let row = 0; row < graphSize * 2; row++){
            const currentRow = []

            for(let col = 0; col < graphSize; col++){
                // CreateNode is imported function which simply create hash with specified parameters
                currentRow.push(createNode(row, col, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol))
            }
            nodesArr.push(currentRow)
        }
        this.setState({ nodes: nodesArr })
    }

    handleClear() {
        const { nodes, finishNodeRow, finishNodeCol } = this.state
        clearWalls(nodes, finishNodeRow, finishNodeCol)
        clearGrid(nodes, finishNodeRow, finishNodeCol)
    }

    render() {
        const { nodes } = this.state

        return (
            <>
            {/* <button onClick={() => generateRecursiveMaze(nodes, 1, (this.state.graphSize * 2) - 3, 1, this.state.graphSize - 3)}>Recursive Maze</button> */}
            <div className="pathfinding-nav">
                <div className="pathfinding-legend">
                </div>
                <div className="pathfinding-buttons-container">
                    <button onClick={() => this.handleClear()}>Clear Grid</button>
                    <button onClick={() => generateBasicMaze(nodes)}>Test Maze Create</button>
                    <button onClick={() => this.visualizePathfinder(aStar)}>Run Dijkstra</button>
                </div>
            </div>
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            
                        const { isStart, isFinish, row, col, isWall } = node
                        return (
                            <Node 
                                key={nodeIdx} 
                                isStart={isStart} 
                                isFinish={isFinish}
                                isWall={isWall}
                                row={row}
                                col={col}></Node>
                            )
                        })}
                    </div>
                })}
            </div>
            </>
        )
    }

}