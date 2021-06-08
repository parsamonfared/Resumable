import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import './FeedbackModal.css';
import { Button } from '@material-ui/core';


class FeedbackModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            feedback: ""
        }
    }

    render(){
        const modalStyle = {
            backgroundColor: "#333333",
            width: "250px",
            height: "80px",
            border: "1px solid #000",
            paddingTop: "15px",
            position: "absolute",
            top: `${this.props.position.y + 40}px`,
            left: `${this.props.position.x}px`
        }
        return (
            <div className="feedback-modal-main">
                {/* <button type="button" onClick={this.handleOpen}>
                    Open Modal
                </button> */}
                <Modal
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    BackdropProps={{ invisible: true }}
                    
                >   
                    <div className="feedback-modal-content" style={modalStyle} >
                        <div className="feedback-comment">
                            <textarea
                                id="feedback-textarea"
                                value={this.state.feedback}
                                onChange={e => this.setState({ feedback : e.target.value })}
                                />
                        </div>
                        <div className="feedback-submit">
                            <button type="button" 
                                value={this.state.feedback}
                                onClick={this.props.onFeedbackCommentSubmit}>Add</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    };
}

export default FeedbackModal;