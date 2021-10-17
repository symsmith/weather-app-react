import React from 'react';
import './Highlight.css';
import compass from './compass.svg';


class BaseHighlight extends React.Component {
  render() {
    return (
      <div className="BaseHighlight">
        <h3 className="highlightTitle">{this.props.data.title}</h3>
        <h1 className="highlightValue">{this.props.data.value}<span className="highlightUnit">{this.props.data.unit}</span></h1>
        <div className="highlightCommentaryBox">
          {this.props.data.title === "Wind Status" ? (<img src={compass} alt="compass icon" className={"compass" + this.props.data.commentary + " compassIcon"} />) : ""}
          <p className="highlightCommentary">{this.props.data.commentary}</p>
        </div>
      </div>
    );
  }
}

export default BaseHighlight;
