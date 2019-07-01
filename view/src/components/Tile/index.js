import React, { Component } from 'react';
import './style.css';

class Tile extends Component {
	render(){
		const height = this.props.height;
		const width = this.props.width
		const index = this.props.index;
		const tile =  this.props.tile;
		return(
        <div
			className="tile"
			onMouseLeave={()=>this.props.onHoverOffTile()}
			// Calculate tile x & y positions 
	        onMouseOver={()=>this.props.onHoverTile(index / width, index % width, index)}>
	     	{tile.trash}
       	</div>
    );
	}
}

export default Tile;