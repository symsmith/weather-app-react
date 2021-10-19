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
  }

  fetchWeek() {
    let url = "https://pro.openweathermap.org/data/2.5/onecall?lat=" + this.props.lat
      + "&lon=" + this.props.lon
      + "&exclude=current,minutely,hourly,alerts"
      + "&units=" + this.props.unitSystem
      + "&appid=" + apiKey;

    fetch(url)
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

  componentDidMount() {
    this.fetchWeek();
  }

  componentDidUpdate(prevProps) {
    this.fetchWeek();
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
