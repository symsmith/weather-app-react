import React from 'react';
import Day from './Detail/Day';
import Hour from './Detail/Hour';
import './DetailList.css';

class DetailList extends React.Component {
  render() {
    const daily = this.props.type === "daily";
    const days = Array.from(Array(7), (e, i) => i + 1);
    const hours = Array.from(Array(24), (e, i) => i + 1);
    return (
      <div className={"DetailList" + (daily ? " DailyList" : " HourlyList")}>
        {daily ? days.map((day) =>
          <Day dailyForecast={this.props.forecast[day]} dayShift={day} key={day.toString()} />) :
          hours.map((hour) =>
            <Hour hourlyForecast={this.props.forecast[hour]} hourShift={hour} key={hour.toString()} />
          )}
      </div>
    );
  }
}


export default DetailList;
