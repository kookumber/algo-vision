import React from "react";
import './node.scss'

export default class Node extends React.Component {

    render() {
        const {
            col,
            row,
            isStart,
            isFinish,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props
        
        const extraClassName = isFinish ? 'node-finish' : 
                                isStart ? 'node-start' : 
                                isWall ? 'node-wall' : ''

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}></div>
        )
    }
}