import React from 'react';
import './Sidebar.css';
import { getName, registerLocale } from 'i18n-iso-countries';
registerLocale(require("i18n-iso-countries/langs/en.json"));

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cityName: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ cityName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.cityName);
  }

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
        <form onSubmit={this.handleSubmit} className="searchForm">
          <div className="iconInput">
            <span className="searchIcon">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input
              type="text"
              className="countrySearch"
              placeholder={weather.name + ", " + getName(weather.sys.country, "en", { select: "alias" })}
              value={this.state.cityName}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" className="searchButton" />
        </form>
        <img
          className="currentWeatherIcon"
          src={"https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@4x.png"}
          alt={weatherDescription}
        />
        <h1>{temp}°
        {
        temp !== feelsLike
              ? (<span className="feelsLike">Feels like <span className="font-serif">{feelsLike}°</span></span>)
          : ""
        }
        </h1>
        <div className="alignment">
          <h2>{weekDay}, <span className="hour">{hours}:{minutes}</span></h2>
          <hr />
          <p className="weatherDescription">{weatherDescription}</p>
        </div>
      </div>
    );
  }
}

export default Sidebar;
