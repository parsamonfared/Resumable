import React from 'react';
import './Highlight.css'

class Highlight extends React.Component {
    render() {
        const highlightStyle = {
            backgroundColor: "#fff2ac",
            backgroundImage: "linear-gradient(to right, #ffe359 0%, #fff2ac 100%)",
            opacity:0.5,
            top: this.props.y,
            left: this.props.x,
            height: this.props.h,
            width: this.props.w + 5,
            zIndex: 99,
            position:"absolute"
        }

        return (
            <div 
                className="highlight" 
                id={`highlight-${this.props.highlightID}`} 
                style={highlightStyle}
                ></div>

        )
    } 
}

export default Highlight;