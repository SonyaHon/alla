import React, {Component} from 'react';
import './Post.css';

class Post extends Component {
	render() {
		return (
			<div className="post">
				<span className="post__title"><span>{this.props.post.date}</span>: <span>{this.props.post.title}</span></span><br/>
				<span className="post__msg">{this.parseMessage()}</span>
				<hr/>
			</div>
		);
	}
	
	parseMessage() {
		var key = 0;
		var msg = this.props.post.message;
		var prevIdx = 0;
		var rgxp = /<[^>]*>(.*?)<[^>]*>/g;
		var childs = [], part;
		
		while(part = rgxp.exec(this.props.post.message)) {
			childs.push(<span key={key++}>{msg.substr(prevIdx, rgxp.lastIndex - prevIdx - part[0].length)}</span>);
			
			var tag = part[0].match(/<(.*?)>/)[1];
			
			if(tag === 'b') {
				childs.push(<span key={key}><b>{part[1]}</b></span>);
			}
			else if(tag === 'i') {
				childs.push(<span key={key}><i>{part[1]}</i></span>);
			}
			else if(tag === 's') {
				childs.push(<span key={key}><s>{part[1]}</s></span>);
			}
			else if(tag.match(/a href=".*"/)[0] === tag) {
				childs.push(<span key={key}><a href={tag.match(/a href="(.*)"/)[1]}>{part[1]}</a></span>);
			}
			else {
				childs.push(<span key={key}>{part[1]}</span>);
			}
			
			prevIdx = rgxp.lastIndex;
			key++;
		}
		childs.push(<span key={key}>{msg.substr(prevIdx)}</span>);
		return childs;
	}
}

export default Post;