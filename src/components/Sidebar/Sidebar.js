import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
  render() {
    let weather = this.props.currentWeather;
    let temp = Math.round(weather.main.temp);
    let feelsLike = Math.round(weather.main.feels_like);
    let date = new Date()
    let weekDay = date.toLocaleString("en-US", { weekday: "long" });
    let hours = date.getHours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    let minutes = date.getMinutes().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    let weatherDescription = weather.weather[0].description.charAt(0).toUpperCase()
      + weather.weather[0].description.slice(1);

    return (
      <div className="Sidebar">
        <img src={"https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@4x.png"} alt="" />
        <h1>{temp}°
        {
        temp !== feelsLike
          ? (<span className="feelsLike">(Feels like {feelsLike})</span>)
          : ""
        }
        </h1>
        <h2>{weekDay}, <span className="hour">{hours}:{minutes}</span></h2>
        <hr />
        <p className="weatherDescription">{weatherDescription}</p>
      </div>
    );
  }
}

export default Sidebar;
