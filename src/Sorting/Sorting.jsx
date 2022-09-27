import React from "react"
import '../Visualizers/Visualizer.scss'
import '../Visualizers/selectBox.scss'
import './sorting.scss'
import { randomIntFromInterval } from "../utils/utils";
import { mergeSort } from "../Sorting/algos/mergeSortAlgo";
import { swap } from "../Sorting/algos/bubbleSortAlgo";
import { quickSort } from "../Sorting/algos/quickSortAlgo";
import { insertionSort } from "../Sorting/algos/insertionSortAlgo";


export default class Sorting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemArr: [],
            arrLength: 60,
            primaryColor: '#fa1593',
            secondaryColor: '#55e7ff',
            tertiaryColor: '#00ffd2',
            selectedAlgo: "",
            algoCategory: "",
        }
        this.updateArrLength = this.updateArrLength.bind(this)
        // this.updateSpeed = this.updateSpeed.bind(this)
        // this.displayGrid = this.displayGrid.bind(this)
    }

    // When app or component loads first time, the array is reset
    componentDidMount() {
        this.resetArr(this.state.arrLength)
    }

    resetArr(len) {
        const arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(randomIntFromInterval(10, 450))
        }
        this.setState({ itemArr: arr })
        this.resetColor()
    }

    resetColor() {
        let arr = this.state.itemArr
        const arrBars = document.getElementsByClassName('bar')
        for (let i = 0; i < arr.length; i++) {
            const barStyle = arrBars[i]
            barStyle.style.backgroundColor = this.state.primaryColor
        }
    }

    updateArrLength(e) {
        let val = e.currentTarget.value
        this.setState({ arrLength: val })
        this.resetArr(e.currentTarget.value)
    }

    handleSelection() {
        if (this.state.selectedAlgo === "Quick Sort") {
            quickSort(0, this.state.arrLength - 1, this.props.animationSpeed)
        } else if (this.state.selectedAlgo === "Bubble Sort") {
            this.bubbleSort()
        } else if (this.state.selectedAlgo === "Merge Sort") {
            mergeSort(this.state.itemArr, this.props.animationSpeed, this.state.primaryColor, this.state.secondaryColor)
        } else if (this.state.selectedAlgo === "Insertion Sort") {
            insertionSort(this.props.animationSpeed)
        }
    }
    
    // Leaving bubble sort function here instead of using import function because 
    // we can use the animation speed state to toggle speed as the sorting is running
    async bubbleSort() {
        let bars = document.getElementsByClassName('bar')

        for (let i = 0; i < bars.length; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                let barOneStyle = bars[j].style
                let barTwoStyle = bars[j + 1].style

                barOneStyle.backgroundColor = this.state.secondaryColor
                barTwoStyle.backgroundColor = this.state.secondaryColor

                const bar1 = bars[j].style.height
                const val1 = Number(bar1.slice(0, bar1.indexOf('p')))
                const bar2 = bars[j + 1].style.height
                const val2 = Number(bar2.slice(0, bar2.indexOf('p')))

                if (val1 > val2) {
                    await swap(bars[j], bars[j + 1], this.props.animationSpeed)
                    bars = document.getElementsByClassName('bar')
                }

                bars[j].style.backgroundColor = this.state.primaryColor
                bars[j + 1].style.backgroundColor = this.state.primaryColor
            }

            bars[bars.length - i - 1].style.backgroundColor = this.state.secondaryColor
        }
    }
    

    render() {

        const sortAlgos = ['Quick Sort', 'Bubble Sort', 'Merge Sort', 'Insertion Sort']

        return (
            <>
            <div className="sorting-nav">
                <div className="configs">
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
                                        sortAlgos.map((algo, idx) => {
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
                <button className="run-button" onClick={e => this.handleSelection(e)}>Run Algo</button>
                </div>
                <div className="configs">
                    <button onClick={() => this.resetArr(this.state.arrLength)}>Reset Array</button>
                    <div className="arr-range-selector">
                        <h4>Array Length: {this.state.arrLength}</h4>
                        <input type="range"
                            min="10"
                            max="200"
                            step="1"
                            defaultValue="30"
                            onChange={e => this.updateArrLength(e)} />
                    </div>
                </div>
            </div>
            <div className="title-container">
                <h3 className="title">{this.state.selectedAlgo}</h3>
            </div>
            <div className="arr-wrap" id="arr-wrap" style={{ width: '80%' }}>
                {
                    this.state.itemArr.map((val, idx) => {
                        return (

                            <div className="bar"
                                key={idx}
                                style={{
                                    height: `${val}px`,
                                    backgroundColor: `${this.state.primaryColor}`
                                }}>
                                {/* <div>{itemArr.length <= 20 ? val : null}</div> */}
                            </div>

                        )
                    })
                }
            </div>
            </>
        )
    }
}