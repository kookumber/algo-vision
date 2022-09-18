import React from "react";
import './sortingVisualizer.scss'
import { randomIntFromInterval} from "../utils/utils";
import { getMergeSortAnimation } from "../sortingAlgos/mergeSortAlgo";
import { swap } from "../sortingAlgos/bubbleSortAlgo";



export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            itemArr: [],
            arrLength: 30,
            primaryColor: '#FF2C83',
            secondaryColor: '#4ecdc4',
            tertiaryColor: '#b5179e',
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

    async bubbleSort() {
        let bars = document.getElementsByClassName('bar')
        
        for (let i = 0; i < bars.length; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                let barOneStyle = bars[j].style
                let barTwoStyle = bars[j+1].style

                barOneStyle.backgroundColor = this.state.secondaryColor
                barTwoStyle.backgroundColor = this.state.secondaryColor

                // await new Promise((resolve) => 
                //     setTimeout(() => {
                //         resolve();
                //     }, 100)
                // )
                
                const bar1 = bars[j].style.height
                const val1 = Number(bar1.slice(0, bar1.indexOf('p')))
                const bar2 = bars[j + 1].style.height
                const val2 = Number(bar2.slice(0, bar2.indexOf('p')))

                if (val1 > val2) {
                    await swap(bars[j], bars[j + 1])
                    bars = document.getElementsByClassName('bar')
                }

                bars[j].style.backgroundColor = this.state.primaryColor
                bars[j + 1].style.backgroundColor = this.state.primaryColor
            }

            bars[bars.length - i - 1].style.backgroundColor = this.state.tertiaryColor
        }
    }

    mergeSort() {
        // Uses itemArr, animationSpeed
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
        <>
        <header>
            <h1 className="site-header">Algovision</h1>
        </header>
        <div className="container">
            
            <div className="user-buttons">
                <div className="configurations">
                    <div>
                        <h3>Configure your Display</h3>
                    </div>
                    <button onClick={() => this.resetArr(this.state.arrLength)}>Generate New Array</button>
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
                        <h4>Animation Speed:</h4>
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

                <div className="algo-selectors">
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
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