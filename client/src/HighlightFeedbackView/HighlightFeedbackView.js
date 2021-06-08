import React from 'react';
import HighlightSidebar from '../HighlightSidebar/HighlightSidebar';
import PdfDisplay from '../PdfDisplay/PdfDisplay';
import Highlight from '../Highlight/Highlight';
import { fetchHighlights } from '../actions/post'
import './HighlightFeedbackView.css';
import ENV from './../config.js'
const API_HOST = ENV.api_host;


class HighlightFeedBackView extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
            feedback: [],
            highlights: []
		}
	}

    componentDidMount() {
        let pid = this.props.location.state.postId;
        let hid = this.props.location.state.highlightId;
        fetchHighlights(pid, hid)
            .then(res => res.json())
            .then(highlight => {
                this.setState({ feedback: highlight.feedback })
                this.drawHighlights();
            }
        )
    }

    drawHighlights() {
        if (this.state.feedback.length > 0) {

            for (let i = 0; i < this.state.feedback.length; i++) {
                let highlight = this.state.feedback[i].highlight;

                this.setState({ highlights: [...this.state.highlights, <Highlight
                    key ={highlight.key}
                    highlightID={highlight.key}
                    x={highlight.x}
                    y={highlight.y}
                    h={highlight.h}
                    w={highlight.w}
                    feedback={this.state.feedback[i].title.text} />]});

            }
        }
    }
	
	
	render(){
		return(
				<div className="highlight-feedback-view-container">
                    <div className="pdf-container-view">
                        <PdfDisplay url={`${API_HOST}/files/${this.props.location.state.post.file}`} width={0.68}></PdfDisplay>
                    </div>

                    <div className="highlight-feedback-sidebar">
						<HighlightSidebar feedbackItems={this.state.feedback}></HighlightSidebar>
					</div>

                    {this.state.highlights ? 
                        this.state.highlights.map(highlight => 
                        (highlight)) : null}

                    <button id="back" onClick={() => this.props.history.goBack()}>Back</button>
                </div>
					
		);
    }   
	
}

export default HighlightFeedBackView;