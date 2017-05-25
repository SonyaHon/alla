import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class Login extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isMounted: false,
			errm: null
		}
		
	}
	
	render() {
		return (
			<div className="login">
				<form onSubmit={this.logIN.bind(this)}>
					<input type="text" placeholder="login"/>
					<input type="password" placeholder="password"/>
					<button className="waves-effect waves-teal btn-flat" type="submit">Log in</button>
					{this.state.errm}
				</form>
			</div>
		);
	}
	
	logIN(evt) {
		evt.preventDefault();
		const login = evt.target.elements[0].value;
		const pass = evt.target.elements[1].value;
		
		var params = 'l='+encodeURIComponent(login) + '&p=' + encodeURIComponent(pass);
		
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:3001/submitLoginForm?" + params, true);
		xhr.send();
		xhr.onreadystatechange = () => {
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				console.log(xhr.response);
				if(xhr.response === 'logined') {
					browserHistory.push('/admin');
				}
				else if(xhr.response === 'bad') {
					if(this.state.isMounted)
					this.setState(() => {
						return {
							isMounted: true,
							errm: <div style={{color: "red"}}>Incorrect login or password.</div>
						}
					});
				}
			}
			
		};
	}
	
	componentDidMount() {
		this.setState(() => {
			return {
				isMounted: true,
				errm: null
			}
		});
	}
	
}

export default Login;