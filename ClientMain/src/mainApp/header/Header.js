import React, {Component} from 'react';
import {Link} from 'react-router';
import './Header.css';

class Header extends Component {
	render() {
		return (
			<div className="header">
				<h5>Alla Krasnozhen</h5>
				<div className="header__wrapper">
					<div className="header__about">
						Product designer<br/>
						Visualisator<br/>
						Artist<br/>
					</div>
					<div className="header__links">
						<Link to="/"><div className="waves-effect waves-teal btn-flat">MAIN</div></Link>
						<Link to="/contacts"><div className="waves-effect waves-teal btn-flat">CONTACTS</div></Link>
						<Link to="/about"><div className="waves-effect waves-teal btn-flat" >ABOUT</div></Link>
						<Link to="/partners"><div className="waves-effect waves-teal btn-flat">PARTNERS</div></Link>
					</div>
				</div>
				<hr/>
			</div>
		);
	}
}

export default Header;