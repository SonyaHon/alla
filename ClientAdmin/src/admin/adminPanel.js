import React, {Component} from 'react';

import './adminPanel.css';
import AddPost from './addPost';
import AddCard from "./addCard";


class AdminPanel extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			devMenu: null
		}
	}
	
	render() {
		return (
			<div className="admin-panel">
				<div className="admin-panel__choice">
					<button className="waves-effect waves-teal btn-flat" onClick={this.makeChoice.bind(this, <AddPost/>)}>MAKE POST</button>
					<button className="waves-effect waves-teal btn-flat" onClick={this.makeChoice.bind(this, <AddCard/>)}>MAKE PORTFOLIO CARD</button>
				</div>
				<hr/>
				<div className="admin-panel__dev">
					{this.state.devMenu}
				</div>
			</div>
		);
	}
	
	makeChoice(comp) {
		this.setState(() => {
			return {
				devMenu: comp
			}
		});
	}
}

export default AdminPanel;