import React from 'react';
import './OneDay.css';


class OneDay extends React.Component {
  render() {
    let dayForecast = this.props.dayForecast;
    console.log(dayForecast);
    let date = new Date();
    date.setDate(date.getDate() + this.props.dayShift);
    let shortWeekDay = date.toLocaleString("en-US", { weekday: "short" });
    return (
      <div className="OneDay">
        <p>{shortWeekDay}</p>
        <img className="forecastWeatherIcon" src={"https://openweathermap.org/img/wn/" + dayForecast.weather[0].icon + "@4x.png"} alt={dayForecast.weather[0].description} />
        <p className="dayTemp">
          <span className="maxTemp">{Math.round(dayForecast.temp.max)}°</span>
          <span className="minTemp">{Math.round(dayForecast.temp.min)}°</span>
        </p>
      </div>
    );
  }
}

export default OneDay;
