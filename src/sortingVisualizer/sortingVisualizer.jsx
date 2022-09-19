import React from "react";
import './sortingVisualizer.scss'
import { randomIntFromInterval} from "../utils/utils";
import { mergeSort } from "../sortingAlgos/mergeSortAlgo";
import { swap } from "../sortingAlgos/bubbleSortAlgo";
import { quickSort } from "../sortingAlgos/quickSortAlgo";



export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            itemArr: [],
            arrLength: 30,
            primaryColor: '#fa1593',
            secondaryColor: '#55e7ff',
            tertiaryColor: '#00ffd2',
            animationSpeed: 15,
            algoDesc: ""
        }
        this.updateArrLength = this.updateArrLength.bind(this)
        this.updateSpeed = this.updateSpeed.bind(this)
    }

    // When app or component loads first time, the array is reset
    componentDidMount() {
        this.resetArr(this.state.arrLength)
    }

    resetArr(len){
        const arr = [];
        for(let i = 0; i < len; i++) {
            arr.push(randomIntFromInterval(10, 450))
        }
        this.setState({ itemArr: arr })
        this.resetColor()

    }

    resetColor(){
        let arr = this.state.itemArr
        const arrBars = document.getElementsByClassName('bar')
        for (let i = 0; i < arr.length; i++) {
            const barStyle = arrBars[i]
            barStyle.style.backgroundColor = this.state.primaryColor
        }
    }

    updateArrLength(e){
        let val = e.currentTarget.value
        this.setState({ arrLength: val })
        this.resetArr(e.currentTarget.value)
    }

    updateSpeed(e){
        let val = e.currentTarget.value
        this.setState({ animationSpeed: val })
    }

    // Leaving bubble sort function here instead of using import function because 
    // we can use the animation speed state to toggle speed as the sorting is running
    async bubbleSort() {
        let bars = document.getElementsByClassName('bar')
        
        for (let i = 0; i < bars.length; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                let barOneStyle = bars[j].style
                let barTwoStyle = bars[j+1].style

                barOneStyle.backgroundColor = this.state.secondaryColor
                barTwoStyle.backgroundColor = this.state.secondaryColor
                
                const bar1 = bars[j].style.height
                const val1 = Number(bar1.slice(0, bar1.indexOf('p')))
                const bar2 = bars[j + 1].style.height
                const val2 = Number(bar2.slice(0, bar2.indexOf('p')))

                if (val1 > val2) {
                    await swap(bars[j], bars[j + 1], this.state.animationSpeed)
                    bars = document.getElementsByClassName('bar')
                }

                bars[j].style.backgroundColor = this.state.primaryColor
                bars[j + 1].style.backgroundColor = this.state.primaryColor
            }

            bars[bars.length - i - 1].style.backgroundColor = this.state.secondaryColor
        }
    }

    handleSelection(algoName) {
        if (algoName === "Quick Sort") {
            quickSort(0, this.state.arrLength - 1)
        } else if (algoName === "Bubble Sort"){
            this.bubbleSort()
        } else if (algoName === "Merge Sort") {
            mergeSort(this.state.itemArr, this.state.animationSpeed, this.state.primaryColor, this.state.secondaryColor)
        }
    }

    render() {

        const { itemArr, primaryColor, secondaryColor, animationSpeed, arrLength } = this.state;
        
        const sortAlgos = ['Quick Sort', 'Bubble Sort', 'Merge Sort']

        return (
        <>
        <header>
            <h1 className="site-header">Algovision <span>by Quang</span></h1>
        </header>
        <div className="container">
            
            <div className="user-buttons">
                <div className="configurations">
                    {/* <div>
                        <h3>Configure your Display</h3>
                    </div> */}
                    <div>
                        <button onClick={() => this.resetArr(this.state.arrLength)}>Reset Array</button>
                        <div className="arr-range-selector">
                            <h4>Array Length: {this.state.arrLength}</h4>
                            <input type="range"
                                min="10"
                                max="100"
                                step="1"
                                defaultValue="30"
                                onChange={e => this.updateArrLength(e)} />
                        </div>
                        <div className="arr-range-selector">
                            <h4 id="speed-header">Animation Speed:</h4>
                            <input type="range"
                                id="speed-control" 
                                min="0.75"
                                max="50"
                                step="1"
                                defaultValue="15"
                                onChange={e => this.updateSpeed(e)} />
                            <div>
                                <span>Slower</span>
                                <span>Faster</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="algo-selectors">
                    <select
                        id="algorithms" 
                        className="select-hidden" 
                        onChange={e => this.handleSelection(e.currentTarget.value)}>
                        <option value="hide">-- Algorithm --</option>
                        {sortAlgos.map((algo, i) => {
                            return (
                                <option key={i} value={algo}>{algo}</option>
                            )
                        })}
                    </select>
                    
                </div>
            </div>
            <div className="arr-wrap" id="arr-wrap" style={{ width: '70%' }}>
            {
                itemArr.map((val, idx) => {
                    return (
                        <div className="bar" 
                             key={idx}
                             style={{
                                height: `${val}px`,
                                backgroundColor: `${this.state.primaryColor}`}}>
                            {/* <div>{itemArr.length <= 20 ? val : null}</div> */}
                        </div>
                    )
                })
            }
            
            </div>
        </div>
        </>
        )
    }


}