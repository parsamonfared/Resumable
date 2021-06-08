import React from 'react';
import PdfDisplay from '../PdfDisplay/PdfDisplay';
import FeedbackModal from '../FeedbackModal/FeedbackModal';
import Highlight from '../Highlight/Highlight';

class PdfHighlight extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            textSelection: null,
            highlights: [],
            highlightID:0,
            highlightCoords: [],
            feedbackPopupOpen: false,
            feedbackComment: "",
            feedbackPopupCoords: null,
            canvasDim:null
        };

        this.handleTextSelection = this.handleTextSelection.bind(this);
        this.handleFeedbackComment = this.handleFeedbackComment.bind(this);
        
    }

    handleFeedbackModalOpen = () => {
        this.setState({ feedbackPopupOpen: true });
    };

    handleFeedbackModalClose = () => {
        this.setState({ feedbackPopupOpen: false });
    };

    handleTextSelection(){
      
        if (!this.state.feedbackPopupOpen) {
            this.setState({ feedbackPopupOpen: false });
            this.setState({ textSelection: null });
            this.setState({ feedbackPopupCoords : null });
            let canvas = document.getElementsByClassName("react-pdf__Page__canvas");
            let canvasRect = canvas[0].getBoundingClientRect();
            this.setState({canvasDim:canvasRect});
            let text = window.getSelection();

            if (text && text.baseNode) {
                if (text.baseNode.textContent.trim() !== "" && text.baseNode.length > 0) {

                    let textRect = text.getRangeAt(0).getBoundingClientRect();

                    if (textRect.x <= canvasRect.width && textRect.y <= canvasRect.height) {
                        let textRectCoords = {
                            x: textRect.x,
                            y: textRect.y,
                            h: textRect.height,
                            w: textRect.width
                        };
                        this.setState({ textSelection: text.toString() });
                        this.setState({ feedbackPopupCoords : textRectCoords });
                        this.setState( {highlightCoords: [...this.state.highlightCoords, textRectCoords] });
                        this.setState({ feedbackPopupOpen: true });    
                    }
                }
            } 
        } 
        
    }

    handleFeedbackComment(e) {
        if (e.target.value != null && e.target.value != "") {
            let currHighlightCoord = this.state.highlightCoords[this.state.highlightCoords.length -1]
            this.setState({ highlightID: this.state.highlightID + 1 });

            this.setState({ highlights: [...this.state.highlights, <Highlight
                key ={this.state.highlightID}
                highlightID={this.state.highlightID}
                x={currHighlightCoord.x}
                y={currHighlightCoord.y - this.state.canvasDim.y}
                h={currHighlightCoord.h}
                w={currHighlightCoord.w} />]});


            this.setState({feedbackComment: e.target.value});
            let newFeedback = {
                content: {
                    text: this.state.textSelection,
                    image: null
                },
                title: {
                    text: e.target.value,
                },
                highlight: {
                    key: this.state.highlightID,
                    x: currHighlightCoord.x,
                    y: currHighlightCoord.y - this.state.canvasDim.y,
                    h: currHighlightCoord.h,
                    w: currHighlightCoord.w
                }
            };
            
            this.props.onFeedbackSubmit(newFeedback);
            this.setState({ feedbackPopupOpen: false });
        }
    }
            
    render(){
		return(
            <div className="pdf-container" onMouseUp={this.handleTextSelection}>
                <PdfDisplay url={this.props.url} width={0.68}></PdfDisplay>
                {this.state.textSelection ? 
                    <FeedbackModal 
                        position = {this.state.feedbackPopupCoords}
                        onFeedbackCommentSubmit={this.handleFeedbackComment}
                        open={this.state.feedbackPopupOpen} 
                        handleClose={this.handleFeedbackModalClose}/> 
                    :null}
                {this.state.highlights ? 
                    this.state.highlights.map(highlight => 
                    (highlight)) : null}
            </div>
		);
	}
}
export default PdfHighlight;