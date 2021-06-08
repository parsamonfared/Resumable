import React from 'react';
import HighlightSidebar from '../HighlightSidebar/HighlightSidebar';
import PdfHighlight from '../PdfHighlight/PdfHighlight';
import {newComment} from '../actions/post'
import './HighlightFeedback.css';
import { Link } from 'react-router-dom';
import ENV from './../config.js'
const API_HOST = ENV.api_host;

class HighlightFeedBack extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			feedback: []
		}
		this.addFeedback = this.addFeedback.bind(this);
	}
	
	
	addFeedback(newFeedback) {
    	this.setState({ feedback: [newFeedback, ...this.state.feedback] });
	}

	postFeedback(e) {
		let postId = this.props.location.state.postId
		let newHighlightComment = {
			type: "HIGHLIGHT",
			Username: this.props.location.state.user,
			text: `http://localhost:3000/highlight-feedback-view`,
			time: Date().toLocaleString(),
			feedback: this.state.feedback
			
		};
		newComment(postId, newHighlightComment)
	}
	
	render(){
		return(
			<div>
				<div className="highlight-feedback-container">
					<div className="highlight-feedback-document">
						<PdfHighlight 
							url={`${API_HOST}/files/${this.props.location.state.post.file}`} 
							onFeedbackSubmit={this.addFeedback}>
						</PdfHighlight>
					</div>
					
					<div className="highlight-feedback-sidebar">
						<HighlightSidebar feedbackItems={this.state.feedback}></HighlightSidebar>
					</div>
					
				</div>
					<button id="back" onClick={() => this.props.history.goBack()}>Back</button>

			{this.state.feedback.length > 0 ?
				<Link
				to={{
					pathname: `/ResumeView/${this.props.location.state.postId}`,
					state:{user: this.props.location.state.user, data: {post:this.props.location.state.post}}
				}}
				>
					<button id="feedback-submit" onClick={() => {this.postFeedback();}}>Submit</button>

				</Link> : 
				
				<button id="feedback-submit-disabled" disabled="true">Submit</button>}
					
			</div> 

			

			
		);
	}
}

export default HighlightFeedBack;