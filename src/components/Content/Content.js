import React from 'react';
import Week from './Week/Week';
import './Content.css';


class Content extends React.Component {
  render() {
    console.log(this.props.dayForecast);
    return (
      <div className="Content">
        <h3 className="cardsSelect"><span className="weekButton active">Week</span></h3>
        <Week />
      </div>
    );
  }
}

export default Content;
