import React from "react";
import './sortingVisualizer.css'
import { randomIntFromInterval, arraysAreEqual } from "../utils/utils";
import { getMergeSortAnimation } from "../sortingAlgos/sortingAlgorithms";


export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            itemArr: [],
            arrLength: 100,
            primaryColor: '#480ca8',
            secondaryColor: '#f72585',
            animationSpeed: 1
        }
    }

    // When app or component loads first time, the array is reset
    componentDidMount() {
        this.resetArr(this.state.arrLength)
    }

    resetArr(len){
        const arr = [];
        for(let i = 0; i < len; i++) {
            arr.push(randomIntFromInterval(5, 500))
        }
        this.setState({ itemArr: arr })
    }

    mergeSort() {
        const animations = getMergeSortAnimation(this.state.itemArr)
        for (let i = 0; i < animations.length; i++) {
            const arrBars = document.getElementsByClassName('bar')
            const isColorChange = i % 3 !== 2

            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i]
                const barOneStyle = arrBars[barOneIdx].style;
                const barTwoStyle = arrBars[barTwoIdx].style;
                const color = i % 3 === 0 ? this.state.primaryColor : this.state.secondaryColor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color;
                }, i * this.state.animationSpeed); 
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i]
                    const barOneStyle = arrBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * this.state.animationSpeed);
            }
        }
    }

    render() {

        const { itemArr } = this.state;
        return (
        <div className="arr-container">
            <div className="arr-wrap">
            <div className="user-buttons">
                <button onClick={() => this.resetArr(this.state.arrLength)}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
            </div>
            {
                itemArr.map((val, idx) => {
                    return (
                        <div className="bar" 
                             key={idx}
                             style={{height: `${val}px`}}>
                        </div>
                    )
                })
            }
            </div>
        </div>
        )
    }


}