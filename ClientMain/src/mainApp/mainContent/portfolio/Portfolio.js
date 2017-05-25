import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Portfolio.css';

import Card from './Card';

class Portfolio extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isMounted: false
		}
		
	}
	
	render() {
		return (
			<div className="portfolio">
				<h5>Portfolio</h5>
				<div className="portfolio__wrapper">
					{this.generateContent()}
				</div>
				<div className="p_hiddenBox">
				</div>
			</div>
		);
	}
	
	generateContent() {
		if(this.state.isMounted) {
			var childs = [];
			for(var i = 0; i < this.props.portfolio.length; i++) {
				childs.push(<Card card={this.props.portfolio[i]}/>)
			}
			return childs;
		}
		return null;
	}
	
	componentDidMount() {
		this.setState(() => {
			return {
				isMounted: true
			}
		})
	}
	
}

function mapStateToProps(state) {
	return {
		portfolio: state.portfolio
	};
}

export default connect(mapStateToProps)(Portfolio);