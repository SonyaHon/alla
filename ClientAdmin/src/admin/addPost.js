import React, {Component} from 'react';
import M from 'materialize-css';

import Post from './post/Post';
import './addPost.css';


function setCaretPosition(pos) {
	var range;
	var elem = document.getElementById('post_message');
	var caretPos = elem.value.length - pos;
	
	if (elem.createTextRange) {
		range = elem.createTextRange();
		range.move('character', caretPos);
		range.select();
	} else {
		elem.focus();
		if (elem.selectionStart !== undefined) {
			elem.setSelectionRange(caretPos, caretPos);
		}
	}
}

class AddPost extends Component {
	
	constructor(props) {
		super(props);
		
		var date = new Date();
		
		this.state = {
			isMounted: false,
			day: date.getDate(),
			month: date.getMonth(),
			year: date.getFullYear(),
			title: "",
			message: ""
		}
		
	}
	
	render() {
		return (
			<div className="add-post">
				<div className="add-post__editor">
					<h5>Editor</h5>
					<div className="add-post__editor_buttons">
						<button className="waves-effect waves-teal btn-flat" onClick={this.addTag.bind(this, "b")}>BOLD</button>
						<button className="waves-effect waves-teal btn-flat" onClick={this.addTag.bind(this, "i")}>ITALIC</button>
						<button className="waves-effect waves-teal btn-flat" onClick={this.addTag.bind(this, "s")}>CROSSED</button>
						<button className="waves-effect waves-teal btn-flat" onClick={this.addLink.bind(this)}>ADD LINK</button>
					</div>
					<div className="add-post__editor_title">
						<div className="input-field">
							<input id="post_title" className="validate active" type="text" onChange={this.titleChanged.bind(this)}/>
							<label htmlFor="post_title">Title</label>
						</div>
					</div>
					<div className="add-post__editor_message">
						<div className="input-field">
							<label htmlFor="post_message">Message</label>
							<textarea id="post_message" className="materialize-textarea" onChange={this.messageChanged.bind(this)}></textarea>
						</div>
					</div>
					<div className="add-post__editor_submit">
						<button className="waves-effect waves-teal btn-flat" onClick={this.publishPost.bind(this)}>PUBLISH</button>
					</div>
				</div>
				<div className="add-post__preview">
					<h5>Preview</h5><br/>
					<div className="add-post__preview_view">
						<Post post={{title: this.state.title, date: this.state.day+'.'+this.state.month+'.'+this.state.year, message: this.state.message}}/>
					</div>
				</div>
				
				<div className="add-post__background-overlay">
				</div>
				
				<div className="add-post__linkInput">
					<div className="input-field">
						<input id="post_link_name" className="validate active" type="text" onChange={this.titleChanged.bind(this)}/>
						<label htmlFor="post_link_name">Text</label>
					</div>
					<div className="input-field">
						<input id="post_link_href" className="validate active" type="text" onChange={this.titleChanged.bind(this)}/>
						<label htmlFor="post_link_href">Address</label>
					</div>
					<div>
						<button className="waves-effect waves-teal btn-flat" onClick={this.addLinkF.bind(this)}>ADD LINK</button>
						<button className="waves-effect waves-teal btn-flat" onClick={this.cancelLinkInput.bind(this)}>CANCEL</button>
					</div>
				</div>
				
				
			</div>
		);
	}
	
	titleChanged() {
		if(this.state.isMounted)
			this.setState((prevState) => {
				var newState = prevState;
				newState.title = document.getElementById("post_title").value;
				return newState;
			});
	}
	
	messageChanged() {
		if(this.state.isMounted)
			this.setState((prevState) => {
				var newState = prevState;
				newState.message = document.getElementById("post_message").value;
				return newState;
			});
	}
	
	addTag(tag) {
		switch(tag) {
			case 'b':
				document.getElementById('post_message').value += "<b></b>";
				setCaretPosition(4);
				break;
			case 'i':
				document.getElementById('post_message').value += "<i></i>";
				setCaretPosition(4);
				break;
			case 's':
				document.getElementById('post_message').value += "<s></s>";
				setCaretPosition(4);
				break;
		}
	}
	
	addLink() {
		document.querySelector(".add-post__background-overlay").style.display = "block";
		document.querySelector('.add-post__linkInput').style.display = "block";
	}
	
	addLinkF() {
		var defaultName = "link";
		var href = document.getElementById("post_link_href").value;
		var name = document.getElementById("post_link_name").value;
		if(name === "") {
			name = defaultName;
		}
		document.getElementById('post_message').value += "<a href=\"" + href + "\">" + name + "</a>";
		setCaretPosition(0);
		this.setState((prevState) => {
			var newState = prevState;
			newState.message = document.getElementById("post_message").value;
			return newState;
		});
		this.cancelLinkInput();
	}
					
	cancelLinkInput() {
		document.getElementById("post_link_name").value = "";
		document.getElementById("post_link_href").value = "";
		document.querySelector(".add-post__background-overlay").style.display = "none";
		document.querySelector('.add-post__linkInput').style.display = "none";
	}
	
	publishPost() {
		//var newPost = {title: this.state.title, date: this.state.day+'.'+this.state.month+'.'+this.state.year, message: this.state.message};
		var newPost = new FormData();
		newPost.append('title', this.state.title);
		newPost.append('date', this.state.day+'.'+this.state.month+'.'+this.state.year);
		newPost.append('message', this.state.message);
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/sendPost', true);
		xhr.send(newPost);
		xhr.onreadystatechange = () => {
				if (xhr.readyState != 4) return;
			
				if (xhr.status != 200) {
					console.log(xhr.status + ': ' + xhr.statusText);
				}
				else {
				
				}
			}
		}
	
	componentDidMount() {
		this.setState((prevState) => {
			var newState = prevState;
			newState.isMounted = true;
			return newState;
		})
	}
}

export default AddPost;