import React from "react";
import { randomIntFromInterval } from "../../utils/utils";
import Node from "../Node/node";
import './pathFinder.scss'
import { dijkstrasAlgo, getNodesInShortestPathOrder } from "../../pathFindingAlgos/dijkstrasAlgo";
// import { generateBasicMaze } from "./animations/generateMaze";

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

    animateDijkStra(visitedNodesInOrder, nodesInShortestPath) {
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

    visualizeDijkstra() {
        const {nodes, startNodeCol, startNodeRow, finishNodeCol, finishNodeRow } = this.state
        const startNode = nodes[startNodeRow][startNodeCol]
        const finishNode = nodes[finishNodeRow][finishNodeCol]
        const visitedNodesInOrder = dijkstrasAlgo(nodes, startNode, finishNode)
        const nodesInShortestPath = getNodesInShortestPathOrder(finishNode)
        this.animateDijkStra(visitedNodesInOrder, nodesInShortestPath)
    }   

    generateNodes(graphSize) {
        const nodesArr = []

        for(let row = 0; row < graphSize * 2; row++){
            const currentRow = []

            for(let col = 0; col < graphSize; col++){
                currentRow.push(this.createNode(row, col))
            }
            nodesArr.push(currentRow)
        }
        this.setState({ nodes: nodesArr })
    }

    createNode(row, col) {

        const { startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state
        return {
            row: row,
            col: col,
            isStart: row === startNodeRow && col === startNodeCol,
            isFinish: row === finishNodeRow && col === finishNodeCol,
            distance: Infinity,
            distanceToFinishNode: Math.abs(finishNodeRow - row) + Math.abs(finishNodeCol - col),
            isVisited: false,
            isWall: false,
            previousNode: null,
            isNode: true
        }
    }

    runPathFinderMaze() {
        this.generateBasicMaze(this.state.nodes)
    }

    generateBasicMaze() {
        // console.log(nodes)
        this.state.nodes.forEach((row, idxRow) => {
            row.forEach((node, idxCol) => {
                const { row, col, isStart, isFinish, isWall } = node

                let randomNum = Math.random()
                // let currentHTMLNode = document.getElementById(`node-${row}-${col}`)
                // console.log(currentHTMLNode)
                let randomNumTwo = node.isWall ? 0.25 : 0.35

                if (randomNum < randomNumTwo && !node.isStart && !node.isFinish) {
                    this.state.nodes[idxRow][idxCol].isWall = true
                    document.getElementById(`node-${row}-${col}`).className = 'node node-wall'
                }
            })
        })
    }


    render() {
        const { nodes } = this.state

        return (
            <>
            <button onClick={() => this.generateBasicMaze()}>Test Maze Create</button>
            <button onClick={() => this.visualizeDijkstra()}>Run Dijkstra</button>
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