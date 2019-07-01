import React, { Component } from 'react';
import Tile from '../Tile';
import hoover from './hoover.png';

class Floor extends Component {
    render() {
        return (
            <div className="rotation-wrapper-outer">
                <div className="rotation-wrapper-inner">
                    <div className="board" style={this.props.boardStyle}>
                        {this.props.tiles.map((tile, i) =>
                            <Tile
                                key={i}
                                tile={tile}
                                index={i}
                                width={this.props.X_MAX}
                                height={this.props.Y_MAX}
                                onHoverTile={this.props.onHoverTile}
                                onHoverOffTile={this.props.onHoverOffTile}
                            />
                        )}

                        <img src={hoover} className="hoover" alt="hoover" style={this.props.hooverStyles} />

                        {this.props.dirtPos.map((item, i) =>
                            this.props.renderDirt(item, i)
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Floor;