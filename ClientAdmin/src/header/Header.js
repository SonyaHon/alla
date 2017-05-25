import React, {Component} from 'react';
import {Link} from 'react-router';
import './Header.css';

class Header extends Component {
	render() {
		//TODO CHANGE LINKS TO VALID ONES
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
						<a href="http://localhost:3001/"><div className="waves-effect waves-teal btn-flat">MAIN</div></a>
						<a href="http://localhost:3001/contacts"><div className="waves-effect waves-teal btn-flat">CONTACTS</div></a>
						<a href="http://localhost:3001/about"><div className="waves-effect waves-teal btn-flat" >ABOUT</div></a>
						<a href="http://localhost:3001/partners"><div className="waves-effect waves-teal btn-flat">PARTNERS</div></a>
					</div>
				</div>
				<hr/>
			</div>
		);
	}
}

export default Header;