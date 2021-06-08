import React from 'react';
import {TextField} from '@material-ui/core';

class TextFieldInput extends React.Component {
    constructor() {
      super();
      this.state = {value: ""};
    }
  
    update = (e) => {
      this.setState({value: e.target.value});
      this.handleSubmit(e.target.value);
      
    }

    handleSubmit(comment) {
        this.props.onCommentChange(comment);
    }
  
    render() {
      return (
        <TextField
            id="comment-textarea"
            name="Comment"
            placeholder="Please insert your comment in here"
            onChange={(e) => this.update(e)}
            value={this.state.value}
            multiline
            variant="outlined"
            fullWidth
        />
      );
    }
  }

export default TextFieldInput;