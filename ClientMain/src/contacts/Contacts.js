import React, {Component} from 'react';

class Contacts extends Component {
	render() {
		return (
			<div className="contacts">
				<h5>Contacts</h5>
				<div style={{padding: "0 10px"}}>
					Russia, Moscow<br/>
					Tel: <a href="tel:+79255406987">+7 (925) 540 69 87 </a><br/>
					Email: a.krasnozhen@yandex.ru
				</div>
			</div>
		);
	}
}

export default Contacts;