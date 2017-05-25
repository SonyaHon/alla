import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import App from './App';
import AdminPanel from './admin/adminPanel';
import Login from './admin/Login';

import './index.css';

function checkLogin(nextState, replace) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:3001/checkforLog", false);
	xhr.send();
	
	if (xhr.status != 200) {
		console.log( xhr.status + ': ' + xhr.statusText );
	} else {
		if(xhr.response !== 'true') {
			replace('/login');
		}
	}
}

ReactDOM.render(
		<Router history={browserHistory}>
			<Route path="/admin" component={App}>
				<IndexRoute component={AdminPanel} onEnter={checkLogin}/>
				<Route path="/login" component={Login}/>
			</Route>
		</Router>,
	document.getElementById('root')
);
