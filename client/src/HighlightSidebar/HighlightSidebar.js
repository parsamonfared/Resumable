import React from "react";
import './HighlightSidebar.css';

function HighlightSidebar({ feedbackItems }) {
  return (
    <div className="highlight-sidebar">
      <div className="description">
        <h2>Feedback Items</h2>
      </div>

      <ul className="feedback-items">
        {feedbackItems.map((feedbackItem, index) => (
          <li
            key={index}
            className="feedback-item"
            onClick={() => {
              let idx = feedbackItems.length - index - 1;
              let highlight = document.getElementById(`highlight-${idx}`);
              highlight.style.backgroundColor = "#5cdb4b";
              highlight.style.backgroundImage = "linear-gradient(to right, #5cdb4b 0%, #99fd9e 100%)";
              highlight.scrollIntoView();

            }}

            onMouseOut = {() => {
              let idx = feedbackItems.length - index - 1;
              let highlight = document.getElementById(`highlight-${idx}`);
              highlight.style.backgroundColor = "#fff2ac";
              highlight.style.backgroundImage = "linear-gradient(to right, #ffe359 0%, #fff2ac 100%)";
            }}
          >
            <div>
              <strong>{feedbackItem.title.text}</strong>
              <div className="feedback-item-content">
                  {feedbackItem.content.text}
              </div>
                {feedbackItem.content.image ? (
                  <div className="feedback-item-image">
                      <img src={feedbackItem.content.image} alt={"No Image Found!"} />
                  </div>
                  ) : null
                }
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HighlightSidebar;
