import React from 'react';
import Week from './Week/Week';
import Highlights from './Highlights/Highlights';
import './Content.css';


class Content extends React.Component {
  render() {
    if (this.props.currentWeather.cod && this.props.currentWeather.cod !== 200) {
      return (
        <div className="Content">
        </div>
      )
    }
    else {
      return (
        <div className="Content">
          <h3 className="cardsSelect"><span className="weekButton active">Week</span></h3>
          <Week lat={this.props.currentWeather.coord.lat} lon={this.props.currentWeather.coord.lon} unitSystem={this.props.unitSystem} />
          <h2 className="highlightsTitle">Today's Highlights</h2>
          <Highlights weather={this.props.currentWeather} unitSystem={this.props.unitSystem} />
        </div>
      );
    }
  }
}

export default Content;
