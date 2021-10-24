import React from 'react';
import OneDay from './OneDay/OneDay';
import './Week.css';

class Week extends React.Component {
  render() {
    const days = [1, 2, 3, 4, 5, 6, 7];
    return (
      <div className="Week">
        {days.map((day) =>
          <OneDay dayForecast={this.props.dailyForecast[day]} dayShift={day} key={day.toString()} />
        )}
      </div>
    );
  }
}


export default Week;
