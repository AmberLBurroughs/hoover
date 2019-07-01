import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <nav className="display">
        <button className={(this.props.finished) ? "hide" : ""} disabled={this.props.disabled} onClick={() => this.props.runHoover()}>{this.props.btnTxt}</button>
        <button className={(this.props.finished) ? "" : "hide"} onClick={() => window.location.reload()}>Reset</button>
        <div className="hover-tile">
          {(this.props.tileCords !== null) ?
            <div >
              <p>Tile X cordinate: {this.props.tileCords.x}</p>
              <p>Tile Y cordinate: {this.props.tileCords.y}</p>
            </div>
            :
            ""
          }
        </div>

        <div className="results">
          {(this.props.finished) ?
            <div>
              <p>Finished cleaning!</p>
              <p>Hoover's Final position (X,Y): {this.props.currentPos[0]},{this.props.currentPos[1]}</p>
              <p>Hoover Picked up: {this.props.totalDirt} pieces of dirt.</p>
            </div>
            :
            ""
          }
        </div>
      </nav>
    )
  }
}

export default Nav;