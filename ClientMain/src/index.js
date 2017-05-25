import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './App';
import Home from './mainApp/Home';
import Contacts from './contacts/Contacts';
import About from './about/About';
import Partners from './partners/Partners';
import './index.css';

//importing all reducers
import reducersAll from './reducers/index.js';
import updateAll from './actions/update_all';

var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);
xhr.send();
xhr.onreadystatechange = () => {
	if(xhr.readyState != 4) return;
	
	if(xhr.status != 200) {
		console.log(xhr.status + ': ' + xhr.statusText);
	}
	else {
		if(xhr.response !== null) {
			var state = JSON.parse(xhr.response);
			store.dispatch(updateAll(state));
		}
	}
	
};

var store = createStore(reducersAll);

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
				<Route path="contacts" component={Contacts}/>
				<Route path="about" component={About}/>
				<Route path="partners" component={Partners}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);

