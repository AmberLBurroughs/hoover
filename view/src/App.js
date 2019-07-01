import React, { Component } from 'react';

import Nav from './components/Nav';
import Floor from './components/Floor';

import Actions from "./Actions/API";

import './App.css';
import dirt from './dirt.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      Y_MAX: 0,
      X_MAX: 0,
      startPos: [],
      DIRECTIONS: [],
      dirtPos: [],
      tiles: null,
      totalDirt: 0,
      tileCords: null,
      btnTxt: "clean",
      finished: false,
      disabled: false
    }

    this.baseState = this.state;
  }

  // Get hoover instructions before first render 
  componentWillMount() {
    this.getInstructions();
  }

  // Update state with values from the response of reading input.txt on the server 
  getInstructions = () => {
    Actions.getInstructions()
      .then(data => { return data.json() })
      .then(response => {
        // these are inverted on the server,
        // since we are rotating the grid 90 degrees
        let x_tiles = response.dimensions[0];
        let y_tiles = response.dimensions[1];

        let totalTiles = y_tiles * x_tiles;

        this.setState({
          Y_MAX: y_tiles,
          X_MAX: x_tiles,
          startPos: response.startPos,
          currentPos: response.startPos,
          DIRECTIONS: response.directions,
          dirtPos: response.dirtPos,
          tiles: new Array(totalTiles).fill({ dirt: null }), // initialize all tiles to be empty
          loading: false
        });

      });
  }

  // Display tile cordinates on hover
  onHoverTile = (xCord, yCord, i) => {
    this.setState({
      tileCords: {
        x: Math.floor(xCord),
        y: Math.floor(yCord)
      }
    });
  }

  // Hide tile cordinates on on mouse off
  onHoverOffTile = () => {
    this.setState({
      tileCords: null
    });
  }

  // Check if hoover current postion matches with a dirt postion
  evalHooverPos = async () => {
    /* - At new coordinate, check if coordinate exists in the dirt array.*/
    let { dirtPos, currentPos, totalDirt } = this.state;
    let currentPosStr = currentPos.join(" ");

    //- If in the dirt array, increment dirt_cleaned counter by +1. 
    // Remove coordinates from dirt array so they aren't counted again.
    if (dirtPos.includes(currentPosStr)) {

      let index = dirtPos.indexOf(currentPosStr);
      totalDirt = totalDirt + 1;

      // remove dirt from dirtPos array so it doesn't get counted more than once
      dirtPos.splice(index, 1);

      this.setState({
        totalDirt,
        dirtPos
      });
    }
  }

  // Start hoover application
  runHoover = async () => {
    this.setState({
      btnTxt: "cleaning...",
      disabled: true
    });

    await this.evalHooverPos();
    await this.moveHoover();
  }

  //Function to determine if hoover moves:
  // Because we have rotated the grid 90 degrees, the X_MAX and Y_MAX
  // are inverted.
  setHooverPos = (pos) => {
    let { currentPos, X_MAX, Y_MAX } = this.state;
    let xCord = currentPos[0];
    let yCord = currentPos[1];

    // evaluate the direction value
    switch (pos) {
      case 'N':
        // - For north: take current (x,y) and check if 0 <= (y+1) < y-dimension. If in bounds, move. 
        if (0 <= (yCord + 1) && (yCord + 1) < X_MAX) {
          currentPos[1] += 1;

          this.setState({
            currentPos,
          });

          // check if hoover hit dirt
          this.evalHooverPos();
        } else {
          console.log("at north edge");
        }
        break;
      case 'E':
        // - For east: take current (x,y) and check if 0 <= (x+1) < x-dimension. If in bounds, move.
        if (0 <= (xCord + 1) && (xCord + 1) < Y_MAX) {
          currentPos[0] += 1;

          this.setState({
            currentPos,
          });

          // check if hoover hit dirt
          this.evalHooverPos();
        } else {
          console.log("at east edge");
        }
        break;
      case 'S':
        // - For south: take current (x,y) and check if 0 <= (y-1) < y-dimension. If in bounds, move.
        if (0 <= (yCord - 1) && (yCord - 1) < X_MAX) {
          currentPos[1] -= 1;

          this.setState({
            currentPos,
          });

          // check if hoover hit dirt
          this.evalHooverPos();
        } else {
          console.log("at south edge");
        }
        break;
      case 'W':
        //- For west: take (x,y) and check if 0 <= (x-1) < x-dimension. If in bounds, move.
        if (0 <= (xCord - 1) && (xCord - 1) < Y_MAX) {
          currentPos[0] -= 1;

          this.setState({
            currentPos,
          });

          // check if hoover hit dirt
          this.evalHooverPos();
        } else {
          console.log("at west edge");
        }
        break;
      default:
        // throw err & end 
        throw new Error(`ERROR: received unexpected direction '${pos}'`);
    }
  }

  // End hoover
  hooverTerminate = async () => {
    /*- After iterating over array of directions */
    this.setState({
      finished: true
    });
  }

  // Loop over directions and trigger hoover to move the on grid 
  moveHoover = () => {
    /*
      - Iterate over array of directions.
      - For each direction, use function setHooverPos to determine movement to new coordinate.
    */
    let { DIRECTIONS } = this.state;
    const moveCount = DIRECTIONS.length;

    for (let i = 0; i < moveCount; i++) {
      // set time out in increments of 500ms to "animate" hoover's movements
      setTimeout(() => { this.setHooverPos(DIRECTIONS[i]); }, 500 * i);
    }

    // after loop completes
    setTimeout(() => { this.hooverTerminate() }, (moveCount * 500));
  }

  // Display all dirt values on the grid
  renderDirt = (item, i) => {
    let x_cord = parseInt(item.split(' ')[0]);
    let y_cord = parseInt(item.split(' ')[1]);

    let dirtStyles = {
      top: `${(x_cord) * 75}px`,
      left: `${(y_cord) * 75}px`
    }

    return <img key={i} src={dirt} className="dirt" alt="dirt" style={dirtStyles} />
  }

  // Hoover application display
  renderHooverView = () => {
    // set the "floor" dimensions
    let boardStyle = {
      width: `${(this.state.X_MAX) * 77}px`,
      height: `${(this.state.Y_MAX) * 77}px`
    }

    // Set hoover's postion on the "floor"
    let hooverStyles = {
      top: `${(this.state.currentPos[0]) * 75}px`,
      left: `${(this.state.currentPos[1]) * 75}px`,
    }

    return (
      <div align="center">
        <Nav
          finished={this.state.finished}
          disabled={this.state.disabled}
          runHoover={this.runHoover}
          btnTxt={this.state.btnTxt}
          tileCords={this.state.tileCords}
          currentPos={this.state.currentPos}
          totalDirt={this.state.totalDirt}
        />
        <Floor
          tiles={this.state.tiles}
          boardStyle={boardStyle}
          hooverStyles={hooverStyles}
          X_MAX={this.state.X_MAX}
          Y_MAX={this.state.Y_MAX}
          onHoverTile={this.onHoverTile}
          onHoverOffTile={this.onHoverOffTile}
          dirtPos={this.state.dirtPos}
          renderDirt={this.renderDirt}
        />
      </div>
    );
  }

  render() {
    // Conditional rendering for delay from server
    return (this.state.loading) ? <div align="center" className="loading"><br /><h1>Loading Hoover....</h1></div> :
      this.renderHooverView()
  }
}

export default App;