import React, {Component} from 'react';
import {connect} from 'react-redux';

import VisibilitySensor from 'react-visibility-sensor';

import './Blog.css';

import Post from './Post.js';

class Blog extends Component {
	render() {
		return (
		<VisibilitySensor partialVisibility={true} offset={{top: 100}} onChange={this.isV.bind(this)}>
			<div className="wrap-blog-div">
				<div className="blog">
					<h5>Blog</h5>
					<div className="blog__wrapper">
						{this.generateContent()}
					</div>
				</div>
			</div>
		</VisibilitySensor>
		);
	}
	
	isV(isVisible) {
		if(!isVisible) {
			document.querySelector('.portfolio').style.width = '100vw';
			document.querySelector('.wrap-blog-div').style.position = 'absolute';
			document.querySelector('.wrap-blog-div h5').style.display = 'none'
		}
		else {
			document.querySelector('.portfolio').style.width = '70vw';
			document.querySelector('.wrap-blog-div').style.position = 'relative';
			document.querySelector('.wrap-blog-div h5').style.display = 'block'
		}
		
	}
	
	generateContent() {
		var childs = [];
		for(var i = this.props.posts.length-1; i >= 0; i--) {
			childs.push(
				<Post key={i} post={this.props.posts[i]}/>
			);
		}
		return childs;
	}
	
}

function mapStateToProps(state) {
	return {
		posts: state.blog,
		lastCard: state.lastCard
	};
}

export default connect(mapStateToProps)(Blog);