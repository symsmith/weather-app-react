import React from 'react';
import Week from './Week/Week';
import Highlights from './Highlights/Highlights';
import './Content.css';


class Content extends React.Component {
  render() {
    return (
      <div className="Content">
        <h3 className="cardsSelect"><span className="weekButton active">Week</span></h3>
        <Week unitSystem={this.props.unitSystem} />
        <h2 className="highlightsTitle">Today's Highlights</h2>
        <Highlights weather={this.props.currentWeather} unitSystem={this.props.unitSystem} />
      </div>
    );
  }
}

export default Content;
