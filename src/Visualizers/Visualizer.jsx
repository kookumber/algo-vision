import React from "react";
import './Visualizer.scss'
import './selectBox.scss'
import PathFinder from "../Pathfinder/pathFinder";
import Sorting from "../Sorting/Sorting";



export default class Visualizer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            itemArr: [],
            arrLength: 30,
            primaryColor: '#fa1593',
            secondaryColor: '#55e7ff',
            tertiaryColor: '#00ffd2',
            animationSpeed: 15,
            algoDesc: "",
            selectedAlgo: "",
            algoCategory: "",
            
        }
        this.updateSpeed = this.updateSpeed.bind(this)
        this.displayGrid = this.displayGrid.bind(this)
    }

    // When app or component loads first time, the array is reset

    parentCallBack(func) {
        return func
    }

    updateSpeed(e){
        let val = e.currentTarget.value
        this.setState({ animationSpeed: val })
    }

    displayGrid() {
        const { algoCategory } = this.state
        if (algoCategory === 'Sorting') {
            return (
                <Sorting animationSpeed={this.state.animationSpeed}></Sorting>
            )
        } else if (algoCategory === "Pathfinding" || algoCategory === "") {
            return (
                <PathFinder animationSpeed={this.state.animationSpeed} parentCallBack={this.parentCallBack}></PathFinder>
            )
        }
    }

    render() {

        const algoCategories = ['Sorting', 'Pathfinding']
        return (
        <>
        <header>
            <h1 className="site-header">Algovision <span>by Quang</span></h1>
        </header>
        <div className="container">
            
            <div className="user-buttons">
                <div className="configurations">
                    <div>
                        <div className="algo-selectors">
                            <ul className="select">
                                <li className="place_holder">
                                    <input className="select_close" type="radio" name="category" id="category-close" value="" />
                                    <span className="select_label select_label-placeholder">Algorithm Category</span>
                                </li>
                                <li className="select_items">
                                    <input className="select_expand" type="radio" name="category" id="category-opener" />
                                    <label className="select_closeLabel" htmlFor="category-close"></label>

                                    <ul className="select_options">
                                        {
                                            algoCategories.map((category, idx) => {
                                                return (
                                                    <li className="select_option" key={idx} onClick={e => this.setState({ algoCategory: category })}>
                                                        <input className="select_input" type="radio" name="category" id={category} />
                                                        <label className="select_label" htmlFor={category}>{category}</label>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <label className="select_expandLabel" htmlFor="category-opener"></label>
                                </li>
                            </ul>
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
            </div>

            {/* --------- GENERATE BARS OR GRID FOR OUR ALGOs --------- */}
            { this.displayGrid() }
        </div>
        </>
        )
    }


}