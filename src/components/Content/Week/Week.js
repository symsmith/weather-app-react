import React from 'react';
import OneDay from './OneDay/OneDay';
import './Week.css';
import apiKey from '../../../secrets';


class Week extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weekForecast: {}
    };
    this.lat = "45.18410544710932";
    this.lon = "5.7225307355130255";
    this.url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + this.lat
      + "&lon=" + this.lon
      + "&exclude=current,minutely,hourly,alerts"
      + "&units=" + this.props.unitSystem
      + "&appid=" + apiKey;
  }

  componentDidMount() {
    fetch(this.url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            weekForecast: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, weekForecast } = this.state;
    const days = [1, 2, 3, 4, 5, 6, 7];
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading…</div>;
    }
    else {
      return (
        <div className="Week">
          {days.map((day) =>
            <OneDay dayForecast={weekForecast.daily[day]} dayShift={day} key={day.toString()} />
          )}
        </div>
      );
    }
  }
}

export default Week;
