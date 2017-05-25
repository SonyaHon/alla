import React, {Component} from 'react';
import Cropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import './addCard.css';

import Card from './card/Card';


function setCaretPosition(pos) {
	var range;
	var elem = document.getElementById('c_text');
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

class ImageInputLine extends Component {
	render() {
		return(
			<div style={{display: 'flex'}}>
			<div className="file-field input-field" style={{width: '90%'}}>
					<div className="btn">
						<span>IMAGE</span>
						<input type="file" id={"p_card_image_input" + this.props.idx} onChange={() => {
							this.props.imageAdded("p_card_image_input" + this.props.idx);
						}}/>
					</div>
					<div className="file-path-wrapper">
						<input className="file-path validate" type="text"/>
					</div>
				</div>
				<i onClick={() => {this.props.deleteNode(this.props.idx)}} className="material-icons md-18">close</i>
			</div>
		);
	}
}

class VideoInputLine extends Component {
	render() {
		return(
			<div style={{display: 'flex'}}>
				<div className="file-field input-field" style={{width: '90%'}}>
					<div className="btn">
						<span>VIDEO</span>
						<input type="file" id={"p_card_video_input" + this.props.idx} onChange={() => {
							this.props.videoAdded();
						}}/>
					</div>
					<div className="file-path-wrapper">
						<input className="file-path validate" type="text"/>
					</div>
				</div>
				<i onClick={() => {this.props.deleteNode(this.props.idx)}} className="material-icons md-18">close</i>
			</div>
		);
	}
}

class AddCard extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isMounted: false,
			title: "",
			mainImage: null,
			items: {
				images: [],
				videos: []
			},
			text: "",
			cardId: 0,
			imagesAdded: [<ImageInputLine key="0" deleteNode={this.deleteImageInputLine.bind(this)} imageAdded={this.updateImages.bind(this)} idx="0"/>],
			videosAdded: [<VideoInputLine key="0" deleteNode={this.deleteVideoInputLine.bind(this)} videoAdded={this.updateVideos.bind(this)} idx="0"/>],
		};

		this.crop = {};

	}
	
	render() {
		return (
			<div className="add-card">
				<div className="c_editor">
					<h5>Editor</h5>
					<div className="c_editor__buttons">
						<button className="waves-effect waves-teal btn-flat" onClick={this.addImg.bind(this)}>ADD IMAGE</button>
						<button className="waves-effect waves-teal btn-flat" onClick={this.addVid.bind(this)}>ADD VIDEO</button>
						<button className="waves-effect waves-teal btn-flat" onClick={this.changeTB.bind(this)}>CHANGE THUMBNAIL IMAGE</button><br/>
						<button className="waves-effect waves-teal btn-flat" onClick={this.addTag.bind(this, "b")}>BOLD</button>
						<button className="waves-effect waves-teal btn-flat" onClick={this.addTag.bind(this, "i")}>ITALIC</button>
						<button className="waves-effect waves-teal btn-flat" onClick={this.addTag.bind(this, "s")}>CROSSED</button>
						<button className="waves-effect waves-teal btn-flat" onClick={this.addLink.bind(this)}>ADD LINK</button>
					</div>
					<div className="c_editor_title">
						<div className="input-field">
							<input id="c_title" className="validate active" type="text" onChange={this.titleChanged.bind(this)}/>
							<label htmlFor="c_title">Title</label>
						</div>
					</div>
					<div className="c_editor_text">
						<div className="input-field">
							<label htmlFor="c_text">Message</label>
							<textarea id="c_text" className="materialize-textarea" onChange={this.textChanged.bind(this)}></textarea>
						</div>
					</div>
					<div className="add-post__editor_submit">
						<button className="waves-effect waves-teal btn-flat" onClick={this.publishCard.bind(this)}>PUBLISH</button>
					</div>
				</div>
				<div className="c_preview">
					<h5>Preview</h5>
					<Card card={{title: this.state.title, text: this.state.text, items: this.state.items, mainImage: this.state.mainImage, cardId: this.state.cardId}}/>
				</div>
				<div className="p_hiddenBox">
				</div>
				<div className="add-post__background-overlay">
				</div>
				
				<div className="p_card__imgInput">
					<span style={{display: "flex", justifyContent: 'space-between'}}><h5>Add image</h5><i onClick={this.closeImageAddMenu.bind(this)} className="material-icons md-18">close</i></span>
					<div style={{maxHeight: "39vh", overflowY: "auto"}}>
					{this.state.imagesAdded}
					</div>
					<div onClick={this.addImageInputLine.bind(this)} className="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">add</i></div>
				</div>
				
				
				<div className="p_card__vidInput">
					<span style={{display: "flex", justifyContent: 'space-between'}}><h5>Add video</h5><i onClick={this.closeVideoAddMenu.bind(this)} className="material-icons md-18">close</i></span>
					<div style={{maxHeight: "39vh", overflowY: "auto"}}>
						{this.state.videosAdded}
					</div>
					<div onClick={this.addVideoInputLine.bind(this)} className="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">add</i></div>
				</div>
				
				
				<div className="p_card__changeTB">
					<span style={{display: "flex", justifyContent: 'space-between'}}><h5>Change thumbnail</h5><i onClick={this.closeChangeTBMenu.bind(this)} className="material-icons md-18">close</i></span>
					<div className="p_card__changeTB__wrapper">
						<div className="p_card__changeTB__buttons">
							<button className="waves-effect waves-teal btn-flat" onClick={this.savePreviewTBImage.bind(this)}>SAVE</button>
						</div>
						<div className="p_card__changeTB__editor">
							<Cropper style={{width: "100%", height: "100%"}}
									 src={this.state.mainImage}
									 crop={{x: 25, y: 25, width: 50,  aspect: 1}}
									 onComplete={(crop, pixelCrop) => {
									 	this.crop.c = crop;
										this.crop.p = pixelCrop;
										console.log(this.crop);
                           			 }}
							/>
						</div>
					</div>
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
	
	addImg() {
		document.querySelector('.add-post__background-overlay').style.display = "block";
		document.querySelector('.p_card__imgInput').style.display = "block";
	}
	
	addVid() {
		document.querySelector('.add-post__background-overlay').style.display = "block";
		document.querySelector('.p_card__vidInput').style.display = "block";
	}
	
	addVideoInputLine() {
		if(this.state.isMounted) {
			this.setState((prevState) => {
				var newState = prevState;
				newState.videosAdded.push(<VideoInputLine key={newState.videosAdded.length} videoAdded={this.updateVideos.bind(this)} deleteNode={this.deleteVideoInputLine.bind(this)} idx={newState.videosAdded.length}/>);
				return newState;
			});
		}
	}

    savePreviewTBImage() {
		var coef = 300 / Math.max(this.crop.p.width, 300);
		var imgWidth = (100 * this.crop.p.width) / this.crop.c.width;
		var imgHeight = (100 * this.crop.p.height) / this.crop.c.height;
		imgWidth *= coef;
        imgHeight *= coef;
		document.querySelector('.p_card').style.backgroundSize = imgWidth + 'px ' + imgHeight + 'px';
        document.querySelector('.p_card').style.backgroundPosition = -(imgWidth * (this.crop.c.x / 100)) + 'px -' + (imgHeight * (this.crop.c.y / 100)) + 'px';
	}
	
	addImageInputLine() {
		if(this.state.isMounted) {
			this.setState((prevState) => {
				var newState = prevState;
				newState.imagesAdded.push(<ImageInputLine key={newState.imagesAdded.length} imageAdded={this.updateImages.bind(this)} deleteNode={this.deleteImageInputLine.bind(this)} idx={newState.imagesAdded.length}/>);
				return newState;
			});
		}
	}
	

	closeVideoAddMenu() {
		document.querySelector('.add-post__background-overlay').style.display = "none";
		document.querySelector('.p_card__vidInput').style.display = "none";
	}
	closeImageAddMenu() {
		document.querySelector('.add-post__background-overlay').style.display = "none";
		document.querySelector('.p_card__imgInput').style.display = "none";
	}
	
	changeTB() {
		document.querySelector('.add-post__background-overlay').style.display = "block";
		document.querySelector('.p_card__changeTB').style.display = "block";
	}
	
	closeChangeTBMenu() {
		document.querySelector('.add-post__background-overlay').style.display = "none";
		document.querySelector('.p_card__changeTB').style.display = "none";
	}
	
	deleteVideoInputLine(idx) {
		if(this.state.isMounted)
			this.setState((prevState) => {
				var newState = prevState;
				for(var i = newState.items.videos.length-1; i >= 0; i--) {
					if(parseInt(newState.items.videos[i].key) == idx) {
						newState.items.videos.splice(i, 1, null);
						break;
					}
				}
				newState.videosAdded.splice(idx, 1, null);
				return newState;
			});
	}
	deleteImageInputLine(idx) {
		if(this.state.isMounted)
			this.setState((prevState) => {
				var newState = prevState;
				for(var i = newState.items.images.length-1; i >= 0; i--) {
					if(parseInt(newState.items.images[i].key) == idx) {
						newState.items.images.splice(i, 1, null);
						break;
					}
				}
                for(var i = 0; i < newState.items.images.length; i++) {
                    if(newState.items.images[i] !== null) {
                        newState.mainImage = newState.items.images[i].props.src;
                        break;
                    }
                }
				newState.imagesAdded.splice(idx, 1, null);
				return newState;
			});
	}
	//TODO ACTUALL IMAGE AND VIDEO HOSTING AND SHOWING
	updateImages(id) {
		var fileReader = new FileReader();
        var content;
       	var idx = id[id.length - 1];
        fileReader.onload = (evt) => {
            content = evt.target.result;
            this.setState((prevState) => {
                var newState = prevState;
                newState.items.images[idx] = <img key={idx} src={content} style={{width: "100%", maxWidth: "90%", margin: "10px"}}/>;
                for(var i = 0; i < newState.items.images.length; i++) {
                    if(newState.items.images[i] !== null) {
                        newState.mainImage = newState.items.images[i].props.src;
                        break;
                    }
                }
                return newState;
            });
        };
		fileReader.readAsDataURL(document.getElementById(id).files[0]);
	}

	updateVideos() {
		this.setState((prevState) => {
			var newState = prevState;
			var vids = [];
			for(var i = 0; i < newState.videosAdded.length; i++) {
				if(newState.videosAdded[i] !== null) {
					//var video = <embed key={i} src={document.getElementById("p_card_video_input"+newState.videosAdded[i].props.idx).value} autoPlay={false} width="560px" height="315px"/>;
					var video = <embed key={i} src="https://www.youtube.com/embed/tyTTHOyG79o" autoPlay={false} width="560px" height="315px"/>;
					vids.push(video);
				}
			}
			newState.items.videos = vids;
			return newState;
		});
	}
	textChanged() {
		if(this.state.isMounted)
			this.setState((prevState) => {
				var newState = prevState;
				newState.text = document.getElementById("c_text").value;
				return newState;
			});
	}
	
	publishCard() {
	
	}
	
	titleChanged() {
		if(this.state.isMounted)
			this.setState((prevState) => {
				var newState = prevState;
				newState.title = document.getElementById("c_title").value;
				return newState;
			});
	}
	
	
	componentDidMount() {
		this.setState((prevState) => {
			var newState = prevState;
			newState.isMounted = true;
			return newState;
		})
	}
	
	addTag(tag) {
		switch(tag) {
			case 'b':
				document.getElementById('c_text').value += "<b></b>";
				setCaretPosition(4);
				break;
			case 'i':
				document.getElementById('c_text').value += "<i></i>";
				setCaretPosition(4);
				break;
			case 's':
				document.getElementById('c_text').value += "<s></s>";
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
		document.getElementById('c_text').value += "<a href=\"" + href + "\">" + name + "</a>";
		setCaretPosition(0);
		this.setState((prevState) => {
			var newState = prevState;
			newState.message = document.getElementById("c_text").value;
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
	
}

export default AddCard;