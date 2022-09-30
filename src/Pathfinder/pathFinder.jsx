import React from "react";
import Node from "./Node/node";
import '../Visualizers/Visualizer.scss'
import './pathFinder.scss'
import { generateBasicMaze } from "./mazeAlgos/basicMaze";
import { createNode } from "./Node/createNodeObject";
import { clearGrid } from "./clearingFunctions/clearGrid";
import { clearWalls } from "./clearingFunctions/clearWalls"
import { getNodesInShortestPathOrder } from "./utils/shortestPathOrder";

import { dijkstrasAlgo } from "./pathFindingAlgos/dijkstrasAlgo";
import { dfs } from "./pathFindingAlgos/dfs";
import { bfs } from "./pathFindingAlgos/bfs"
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
            selectedAlgo: "",
            isRunning: false,
            mouseIsPressed: false,
            isWallNode: false,
            isStartNode: false,
            isFinishNode: false,
            currRow: 0,
            currCol: 0
        }
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.toggleIsRunning = this.toggleIsRunning.bind(this)
        
    }

    componentDidMount(){
        this.generateNodes(this.state.graphSize)
    }

    // ---------------------- START ANIMATION FUNCTIONS -------------------
    animateShortestPath(nodesInShortestPath) {
        this.toggleIsRunning()
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
                const nodeClassName = node ? document.getElementById(`node-${node.row}-${node.col}`).className : null
                if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish'){
                    return node ? document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited' : null
                }
            }, 5 * i)
        }
    }

    visualizePathfinder(algo) {
        const {nodes, startNodeCol, startNodeRow, finishNodeCol, finishNodeRow } = this.state
        
        if(!this.state.isRunning) {
            clearGrid(nodes, finishNodeRow, finishNodeCol)
            this.toggleIsRunning()
        }
       
        clearGrid(nodes, finishNodeRow, finishNodeCol)
        
        const startNode = nodes[startNodeRow][startNodeCol]
        const finishNode = nodes[finishNodeRow][finishNodeCol]
        const visitedNodesInOrder = algo(nodes, startNode, finishNode)
        const nodesInShortestPath = getNodesInShortestPathOrder(finishNode)
        this.animatePathfinder(visitedNodesInOrder, nodesInShortestPath)
    }   

    // ---------------------- END ANIMATION FUNCTIONS -------------------


    // ---------------------- START GRID/NODE FUNCTIONS -------------------
    generateNodes(graphSize) {
        const nodesArr = []
        const { startNodeRow, startNodeCol, finishNodeRow, finishNodeCol } = this.state
        for(let row = 0; row < graphSize * 2.5; row++){
            const currentRow = []

            for(let col = 0; col < graphSize; col++){
                // CreateNode is imported function which simply create hash with specified parameters
                currentRow.push(createNode(row, col, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol))
            }
            nodesArr.push(currentRow)
        }
        this.setState({ nodes: nodesArr })
    }

    generateGrid(){
        const { nodes } = this.state
        return (
            <div className="grid" onMouseLeave={() => this.handleMouseLeave()}>
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
                                    col={col}
                                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                    onMouseUp={() => this.handleMouseUp(row, col)}></Node>
                            )
                        })}
                    </div>
                })}
            </div>
        )
    }

    // ---------------------- END GRID/NODE FUNCTIONS -------------------

    // ---------------------- START MOUSE HANDLING FUNCTIONS -------------------

    // We'll use this function here to return a new grid where the wall for the node we moused over
    // is cleared or becomes a wall
    getNewGridWithWallToggled(grid, row, col) {
        const newGrid = grid.slice()
        const node = newGrid[row][col]
        if(!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
                ...node, 
                isWall: !node.isWall
            }
            newGrid[row][col] = newNode
        }
        return newGrid
    }

    toggleIsRunning() {
        this.setState({ isRunning: !this.state.isRunning })
    }

    handleMouseDown(row, col) {
        if(!this.state.isRunning){
            if (this.isGridClear()) {
                let nodeClass = document.getElementById(`node-${row}-${col}`).className
                if (nodeClass === 'node node-start') {
                    this.setState({
                        mouseIsPressed: true,
                        isStartNode: true,
                        currRow: row,
                        currCol: col
                    })
                } else if (nodeClass === 'node node-finish') {
                    this.setState({
                        mouseIsPressed: true,
                        isFinishNode: true,
                        currRow: row,
                        currCol: col
                    })
                } else {
                    const newGrid = this.getNewGridWithWallToggled(this.state.nodes, row, col)
                    this.setState({
                        grid: newGrid,
                        mouseIsPressed: true,
                        isWallNode: true,
                        currRow: row,
                        currCol: col
                    })
                }
            } else {
                clearGrid(this.state.nodes, this.state.finishNodeRow, this.state.finishNodeCol)
            }
        }
    }

    isGridClear() {
        for (let row of this.state.nodes) {
            for (let node of row) {
                if (node.isVisted) return false
            }
        }
        return true
    }

    handleMouseEnter(row, col){

        const { currRow, currCol, mouseIsPressed, isRunning, isStartNode, isFinishNode, nodes, isWallNode } = this.state
        if (!isRunning) {
            if (mouseIsPressed) {
                const nodeClass = document.getElementById(`node-${row}-${col}`).className
                if (this.state.isStartNode) {
                    if (nodeClass !== 'node node-wall') {

                        const prevStartNode = nodes[currRow][currCol]
                        prevStartNode.isStart = false

                        document.getElementById(`node-${currRow}-${currCol}`).className = 'node'

                        this.setState({ currRow: row, currCol: col})

                        const currStartNode = nodes[row][col]
                        currStartNode.isStart = true
                        
                        document.getElementById(`node-${row}-${col}`).className = 'node node-start'
                    }
                    this.setState({ startNodeRow: row, startNodeCol: col})
                } else if (this.state.isFinishNode) {
                    if (nodeClass !== 'node node-wall') {

                        const prevFinishNode = nodes[currRow][currCol]
                        prevFinishNode.isFinish = false

                        document.getElementById(`node-${currRow}-${currCol}`).className = 'node'

                        this.setState({ currRow: row, currCol: col })
                        const currFinishNode = nodes[row][col]
                        currFinishNode.isFinish = true

                        document.getElementById(`node-${row}-${col}`).className = 'node node-finish'
                    }
                    this.setState({ finishNodeRow: row, finishNodeCol: col })
                } else if (this.state.isWallNode) {
                    const newGrid = this.getNewGridWithWallToggled(nodes, row, col)
                    this.setState({ nodes: newGrid })
                }
            }
        }
    }

    handleMouseUp(row, col){
        const {isRunning, isStartNode, isFinishNode } = this.state
        if(!isRunning) {
            this.setState({ mouseIsPressed: false })
            if (isStartNode) {
                this.setState({ isStartNode: !isStartNode, startNodeRow: row, startNodeCol: col})
            } else if (isFinishNode) {
                this.setState({ isFinishNode: !isFinishNode, finishNodeRow: row, finishNodeCol: col })
            } 
            this.generateGrid()
        }
    }

    handleMouseLeave() {
        const {isStartNode, isFinishNode, isWallNode } = this.state

        // We use this for the entire grid. When we leave, we track the nodes we've updated even if we don't
        // unclick or hit a mouse up event
        if (isStartNode) {
            this.setState({ isStartNode: !isStartNode, mouseIsPressed: false})
        } else if (isFinishNode){
            this.setState({ isFinishNode: !isFinishNode, mouseIsPressed: false})
        } else if (isWallNode) {
            this.setState({ isWallNode: !isWallNode, mouseIsPressed: false})
            this.generateGrid()
        }
    }

    // ---------------------- END MOUSE HANDLING FUNCTIONS -------------------

    handleSelection() {
        const { selectedAlgo } = this.state

        if (selectedAlgo === "Dijkstra's") {
            this.visualizePathfinder(dijkstrasAlgo)
        } else if (selectedAlgo === "DFS") {
            this.visualizePathfinder(dfs)
        } else if (selectedAlgo === "aStar") {
            this.visualizePathfinder(aStar)
        } else if (selectedAlgo === "BFS") {
            this.visualizePathfinder(bfs)
        }
    }

    render() {
        const { nodes, finishNodeRow, finishNodeCol } = this.state
        const pathfinderAlgos = ["Dijkstra's", "DFS", "BFS", "aStar"]
        return (
            <>
            {/* <button onClick={() => generateRecursiveMaze(nodes, 1, (this.state.graphSize * 2) - 3, 1, this.state.graphSize - 3)}>Recursive Maze</button> */}
            <div className="pathfinding-nav">
                <div className="pathfinding-buttons-container">
                    <div className="algo-selectors">
                        <ul className="select">
                            <li className="place_holder">
                                <input className="select_close" type="radio" name="algorithm" id="algorithm-close" value="" />
                                <span className="select_label select_label-placeholder">Select Algorithm</span>
                            </li>
                            <li className="select_items">
                                <input className="select_expand" type="radio" name="algorithm" id="algorithm-opener" />
                                <label className="select_closeLabel" htmlFor="algorithm-close"></label>

                                <ul className="select_options">
                                    {
                                        pathfinderAlgos.map((algo, idx) => {
                                            return (
                                                <li className="select_option" key={idx} onClick={e => this.setState({ selectedAlgo: algo })}>
                                                    <input className="select_input" type="radio" name="algorithm" id={algo} />
                                                    <label className="select_label" htmlFor={algo}>{algo}</label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <label className="select_expandLabel" htmlFor="algorithm-opener"></label>
                            </li>
                        </ul>
                    </div>
                    <button onClick={() => this.handleSelection()}>Run Algo</button>
                </div>
                <div className="pathfinding-buttons-container">
                    <button onClick={() => clearGrid(nodes, finishNodeRow, finishNodeCol)}>Clear Path</button>
                    <button onClick={() => clearWalls(nodes, finishNodeRow, finishNodeCol)}>Clear Walls</button>
                        <button onClick={() => { clearWalls(nodes, finishNodeRow, finishNodeCol); generateBasicMaze(nodes)}}>Generate Maze</button>
                </div>
            </div>
            <div className="title-container">
                <h3 className="title">{this.state.selectedAlgo}</h3>
            </div>
            {this.generateGrid()}
            </>
        )
    }

}