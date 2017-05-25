import React, {Component} from 'react';
import srcollWithAnim from 'scrollto-with-animation';
import './Card.css';

class Card extends Component {
	render() {
		return (
			<div>
				<div className="p_card" style={{background: 'url("' + this.props.card.mainImage + '") no-repeat' }}>
					<div className="p_card__title">
						<span>{this.props.card.title}</span><i onClick={this.openModalWindow.bind(this)} className="material-icons md-18">zoom_out_map</i>
					</div>
				</div>
				<div className="p_card__modal" id={"card"+this.props.card.cardId}>
					<a style={{position: "fixed", top: '5vh', left: '50px'}} className="btn-floating btn-large waves-effect waves-light blue"  onClick={this.scrollUp.bind(this)}><i className="material-icons">keyboard_arrow_up</i></a>
					<a style={{position: "fixed", bottom: '5vh', left: '50px'}} className="btn-floating btn-large waves-effect waves-light blue"  onClick={this.scrollDown.bind(this)}><i className="material-icons">keyboard_arrow_down</i></a>
					<a style={{position: "fixed", top: '5vh', right: '50px'}} className="btn-floating btn-large waves-effect waves-light blue" onClick={this.closeModeWindow.bind(this)}><i className="material-icons">clear</i></a>
					<div className="p_card__title_flat">
						<span style={{textAlign: 'center'}}>{this.props.card.title}</span>
					</div>
					<hr/>
					<div className="p_card__modal_content">
						{this.props.card.items.images}
						{this.props.card.items.videos}
					</div>
					<hr/>
					<div className="p_card__modal_text">
						{this.parseText()}
					</div>
				</div>
			</div>
		);
	}

    scrollUp() {
        srcollWithAnim(document.body,
		'scrollTop',
		0,
		1000,
		'easeInOutCirc', () => {});
	}

    scrollDown() {
        srcollWithAnim(document.body,
            'scrollTop',
            document.body.scrollHeight,
            1300,
            'easeInOutCirc', () => {});
	}

	openModalWindow() {
		this.showBox(true);
		document.getElementById("card" + this.props.card.cardId).style.display = "block";
	}
	
	closeModeWindow() {
		document.getElementById("card" + this.props.card.cardId).style.display = "none";
		this.showBox(false);
	}
	
	showBox(flag) {
		if(flag) {
			document.querySelector(".p_hiddenBox").style.display = "block";
		}
		else {
			document.querySelector(".p_hiddenBox").style.display = "none";
		}
	}
	
	parseText() {
		var key = 0;
		var msg = this.props.card.text;
		var prevIdx = 0;
		var rgxp = /<[^>]*>(.*?)<[^>]*>/g;
		var childs = [], part;
		
		while(part = rgxp.exec(this.props.card.text)) {
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

export default Card;