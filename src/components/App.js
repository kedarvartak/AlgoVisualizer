import React from 'react';
import '../styles/index.css';
import Sidebar from 'react-sidebar';
import Select from 'react-select';
import Grid from './Grid';
import Tutorial from './Tutorial';


//Node Types
export const NodeType = {
    START_NODE: 'START_NODE',
    FINISH_NODE: 'FINISH_NODE',
    WALL_NODE: 'WALL_NODE',
    VISITED_NODE: 'VISITED_NODE',
    EMPTY_NODE: 'EMPTY_NODE'
};

const Algorithms = {
    BFS: 'Breadth First Search',
    DFS: 'Depth First Search',
    DIJKSTRA: 'Dijkstra\'s Algorithm',
    ASTAR: 'A* Search Algorithm',
};

const Maze = {
    RANDOM: 'RANDOM',
    RECURSIVE_DIVISION: 'RECURSIVE_DIVISION',
    PRIMS_ALGORITHM: 'PRIMS_ALGORITHM',
    ELLERS_ALGORITHM: 'ELLERS_ALGORITHM',
};

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            multiGrid: false,
            displaySpeed: 0.5,
            mazeAlgorithm: null,
            visualiseAlgorithm: false,
            selectedAlgorithm: Algorithms.BFS,
            clearBoard: false,
            clearWalls: false,
            showTutorial: true,
            gridActive: false,
        };
    }

    //Triggers visualise algorithm in grid component when visualise button is clicked
    visualiseAlgorithm = () => {
        this.setState({
            visualiseAlgorithm: true,
        }, () => {
            this.setState({
                visualiseAlgorithm: false,
            });
        });
    };

    //Triggers generate maze in grid component when one of the maze dropdowns are clicked
    updateGrid = (val) => {
        this.setState({
            mazeAlgorithm: null,
        }, () => {
            this.setState({
                mazeAlgorithm: val,
            });
        });
    };

    //Updates selected algorithm
    updateAlgorithm = val => {
        this.setState({
            selectedAlgorithm: val,
        });
    };

    //State change causes two grids to render
    compareAlgorithms = () => {
        this.clearBoard();
        setTimeout(() => {
            this.setState(prevState => ({
                multiGrid: !prevState.multiGrid
            }));
        }, 5);
    };

    //Triggers clear board function in grid components
    clearBoard = () => {
        this.setState({
            clearBoard: true,
        }, () => {
            this.setState({
                clearBoard: false,
            });
        });
    };

    //Triggers clear walls function in grid components
    clearWalls = () => {
        this.setState({
            clearWalls: true,
        }, () => {
            this.setState({
                clearWalls: false,
            });
        });
    };

    //Sidebar render function
    sidebarContent = () => {
        const options = [
            {value: Algorithms.BFS, label: 'Breadth First Search'},
            {value: Algorithms.DFS, label: 'Depth First Search'},
            {value: Algorithms.DIJKSTRA, label: 'Dijkstra\'s Algorithm'},
            {value: Algorithms.ASTAR, label: 'A* Search Algorithm'},
        ];

        const options2 = [
            {value: Maze.PRIMS_ALGORITHM, label: 'Prim\'s Algorithm'},
            {value: Maze.RANDOM, label: 'Random Maze'},
        ];

        const placeholderText = options.find(obj => obj.value === this.state.selectedAlgorithm).label;

        const customStyles = {
            container: base => ({
                ...base,
                width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',
            }),
            option: (provided) => ({
                ...provided,
                width: '100%',
            }),
            control: (provided) => ({
                ...provided,
                width: '100%',
                borderRadius: '5px',
            }),
        };

        return (
            <div className={'sidebarContainer'}>
                <h3 className={'sidebarTitle'} style={{textAlign: 'center'}}>Algo-Visualizer</h3>
                <h4 className={'sidebarTitle'} style={{textAlign: 'center'}}>Project  under guidance of Surabhi ma'am</h4>
                <div style={{margin: 'auto', width: '90%'}}>
                    <h5>Algorithm</h5>
                </div>
                <Select
                    isSearchable={false}
                    placeholder={placeholderText}
                    value={this.state.selectedAlgorithm}
                    onChange={val => this.updateAlgorithm(val.value)}
                    options={options}
                    styles={customStyles}
                />
                <br/>
                <div style={{margin: 'auto', width: '90%'}}>
                    <h5>Generate Maze</h5>
                </div>
                <Select
                    isSearchable={false}
                    placeholder={'Select Maze Algorithm'}
                    value={null}
                    onChange={val => this.updateGrid(val.value)}
                    options={options2}
                    styles={customStyles}
                />
                <br/>
                <div className={'buttons'}>
                    <button type='button' disabled={this.state.gridActive} onClick={() => this.visualiseAlgorithm()}
                            className={this.state.gridActive ? 'disabled' : 'button'}>Visualise
                    </button>
                    <button type='button' onClick={this.clearWalls} className={'button'}>Clear Walls</button>
                    <button type='button' onClick={() => {
                        this.clearWalls();
                        this.clearBoard();
                    }} className={'button'}>Clear Board
                    </button>
                    <button type='button' onClick={this.compareAlgorithms} className={'button'}>
                        {this.state.multiGrid ? 'Single Maze' : 'Compare Algorithms'}
                    </button>
                </div>
            </div>
        );
    };

    //Toggles Tutorial modal
    toggleTutorial = () => {
        this.setState(prevState => ({
            showTutorial: !prevState.showTutorial
        }));
    };

    toggleGrid = () => {
        this.setState(prevState => ({
            gridActive: !prevState.gridActive,
        }));
    };

    render() {
        return (
            <div>
                <div className={this.state.showTutorial ? 'tutorialView' : 'displayOff'}>
                </div>
                <Sidebar
                    docked={true}
                    sidebar={this.sidebarContent()}
                    sidebarClassName={'sidebar'}>
                    <Tutorial toggleTutorial={this.toggleTutorial} showTutorial={this.state.showTutorial}/>
                    {!this.state.multiGrid ?
                        <Grid
                            multiGrid={false}
                            selectedAlgorithm={this.state.selectedAlgorithm}
                            mazeAlgorithm={this.state.mazeAlgorithm}
                            clearBoard={this.state.clearBoard}
                            clearWalls={this.state.clearWalls}
                            toggleGrid={this.toggleGrid}
                            displaySpeed={this.state.displaySpeed}
                            visualiseAlgorithm={this.state.visualiseAlgorithm}/> :
                        <div className={'multiGrid'}>
                            <Grid
                                multiGrid={true}
                                selectedAlgorithm={this.state.selectedAlgorithm}
                                mazeAlgorithm={this.state.mazeAlgorithm}
                                displaySpeed={this.state.displaySpeed}
                                clearBoard={this.state.clearBoard}
                                toggleGrid={this.toggleGrid}
                                clearWalls={this.state.clearWalls}
                                visualiseAlgorithm={this.state.visualiseAlgorithm}/>
                            <Grid
                                multiGrid={true}
                                selectedAlgorithm={this.state.selectedAlgorithm}
                                mazeAlgorithm={this.state.mazeAlgorithm}
                                clearBoard={this.state.clearBoard}
                                clearWalls={this.state.clearWalls}
                                toggleGrid={this.toggleGrid}
                                displaySpeed={this.state.displaySpeed}
                                visualiseAlgorithm={this.state.visualiseAlgorithm}/>
                        </div>}
                </Sidebar>
            </div>
        );
    }
}

export default App;
