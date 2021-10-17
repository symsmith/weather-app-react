import React from 'react';
import './BaseHighlight.css';


class BaseHighlight extends React.Component {
  render() {
    return (
      <div className="BaseHighlight">
        <h3 className="highlightTitle">{this.props.data.title}</h3>
        <h1 className="highlightValue">{this.props.data.value}<span className="highlightUnit">{this.props.data.unit}</span></h1>
        <p className="highlightCommentary">{this.props.data.commentary}</p>
      </div>
    );
  }
}

export default BaseHighlight;
