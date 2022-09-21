import React from "react";
import { randomIntFromInterval } from "../../utils/utils";
import Node from "../Node/node";
import './pathFinder.scss'

export default class PathFinder extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nodes: [],
            graphSize: 24
        }
    }

    componentDidMount(){
        this.generateNodes(this.state.graphSize)
    }

    generateNodes(graphSize) {
        const nodesArr = []

        for(let row = 0; row < graphSize * 2; row++){
            const currentRow = []

            for(let col = 0; col < graphSize; col++){

                const currentNode = {
                    col,
                    row,
                    isStart: row === 10 && col === 5,
                    isFinish: row === 39 && col === 15
                }
                currentRow.push(currentNode)
            }
            nodesArr.push(currentRow)
        }
        this.setState({ nodes: nodesArr })
    }

    render() {
        const { nodes } = this.state

        return (
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return <div>
                        {row.map((node, nodeIdx) => {
                            
                        const { isStart, isFinish } = node
                        return <Node key={nodeIdx} isStart={isStart} isFinish={isFinish}></Node> 
                        })}
                    </div>
                })}
            </div>
        )
    }

}