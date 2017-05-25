import React, {Component} from 'react';
import './mainContent.css';

import Blog from './blog/Blog.js';
import Portfolio from './portfolio/Portfolio.js';

class mainContent extends Component {
	render() {
		return (
			<div className="main-content">
				<Portfolio/>
				<Blog/>
			</div>
		);
	}
}

export default mainContent;
