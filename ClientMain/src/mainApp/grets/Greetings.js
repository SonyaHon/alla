import React, {Component} from 'react';
import ReactSVG from 'react-svg';
import './Greetings.css';

import fbLogo from './facebook-logo.svg';
import bhLogo from './behance-logo.svg';
import instLogo from './iconmonstr-instagram-1.svg';

class Greetings extends Component {
	render() {
		return (
			<div className="greetings">
				<h5>Greetings!</h5>
				<div className="greetings__wrapper">
					<div className="greetings__content">
						I am a product designer, 3d visualizer and artist.<br/>I create objects, 3d visualization and art  graphics.
					</div>
					<div className="greetings__links">
						<a href="#" target="_blank">
						<ReactSVG
								path={fbLogo}
								className="icon_wrapper"
						/></a>
						<a href="https://www.behance.net/Allochka_88" target="_blank">
						<ReactSVG
								path={bhLogo}
								className="icon_wrapper"
						/></a>
						<a href="#" target="_blank">
						<ReactSVG
								path={instLogo}
								className="icon_wrapper"
						/></a>
					</div>
				</div>
			</div>
		);
	}
}

export default Greetings;