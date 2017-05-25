import {combineReducers} from 'redux';

import blog from './r_blog.js';
import portfolio from './r_portfolio.js';

export default combineReducers({
	blog: blog,
	portfolio: portfolio
});