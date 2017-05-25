import React, {Component} from 'react';

import Greetings from './grets/Greetings';
import MainContent from './mainContent/mainContent';

class Home extends Component {
	render() {
		return (
			<div className="home">
				<Greetings />
				<MainContent />
			</div>
		);
	}
}

export default Home;