import React from 'react';
import BaseHighlight from './BaseHighlight/BaseHighlight';
import SunHighlight from './BaseHighlight/SunHighlight';
import './Highlights.css';
import apiKey from '../../../secrets';


class Highlights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      airPollution: {}
    };
    this.url = "https://pro.openweathermap.org/data/2.5/air_pollution?lat=" + this.props.weather.coord.lat
      + "&lon=" + this.props.weather.coord.lon
      + "&appid=" + apiKey;
  }

  componentDidMount() {
    fetch(this.url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            airPollution: result
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
    const { error, isLoaded, airPollution } = this.state;

    let weather = this.props.weather;
    let metric = this.props.unitSystem === "metric";

    /* Wind direction */
    let windDeg = weather.wind.deg;
    let windDirection = 'N';
    if (windDeg > 11.25 && windDeg <= 33.75) windDirection = 'NNE';
    else if (windDeg > 33.75 && windDeg <= 56.25) windDirection = 'NE';
    else if (windDeg > 56.25 && windDeg <= 78.75) windDirection = 'ENE';
    else if (windDeg > 78.75 && windDeg <= 101.25) windDirection = 'E';
    else if (windDeg > 101.25 && windDeg <= 123.75) windDirection = 'ESE';
    else if (windDeg > 123.75 && windDeg <= 146.25) windDirection = 'SE';
    else if (windDeg > 146.25 && windDeg <= 168.75) windDirection = 'SSE';
    else if (windDeg > 168.75 && windDeg <= 191.25) windDirection = 'S';
    else if (windDeg > 191.25 && windDeg <= 213.75) windDirection = 'SSW';
    else if (windDeg > 213.75 && windDeg <= 236.25) windDirection = 'SW';
    else if (windDeg > 236.25 && windDeg <= 258.75) windDirection = 'WSW'
    else if (windDeg > 258.75 && windDeg <= 281.25) windDirection = 'W';
    else if (windDeg > 281.25 && windDeg <= 303.75) windDirection = 'WNW';
    else if (windDeg > 303.75 && windDeg <= 326.25) windDirection = 'NW';
    else if (windDeg > 326.25 && windDeg <= 348.75) windDirection = 'NNW';

    /* Pressure commentary */
    let pressure = weather.main.pressure;
    let pressureCommentary = "Low";
    if (pressure > 1009 && pressure <= 1017) pressureCommentary = "Average";
    else if (pressure > 1017) pressureCommentary = "High";

    /* Humidity commentary */
    let humidity = weather.main.humidity;
    let humidityCommentary = "Low";
    if (humidity > 55 && humidity <= 65) humidityCommentary = "Average";
    else if (humidity > 65) humidityCommentary = "High";

    /* Visibility commentary */
    let visibility = weather.visibility;
    let visibilityCommentary = "Very bad";
    if (visibility > 0.5 * 1852 && visibility <= 2 * 1852)
      visibilityCommentary = "Bad";
    else if (visibility > 2 * 1852 && visibility <= 5 * 1852)
      visibilityCommentary = "Average";
    else if (visibility > 5 * 1852)
      visibilityCommentary = "Good";

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading…</div>;
    }
      else {
        /* Air pollution commentary */
        let pollutionValue = airPollution.list[0].main.aqi;
        let pollutionCommentary;
        switch (pollutionValue) {
          case 1:
            pollutionCommentary = "Good";
            break;
          case 2:
            pollutionCommentary = "Fair";
            break;
          case 3:
            pollutionCommentary = "Moderate";
            break;
          case 4:
            pollutionCommentary = "Poor";
            break;
          default:
            pollutionCommentary = "Very Poor"
            break;
        }

        let baseHighlights = [
          {
            title: "Wind Status",
            value: metric ? Math.floor(weather.wind.speed * 3.6 * 10) / 10 : Math.floor(weather.wind.speed),
            unit: metric ? "km/h" : "mph",
            commentary: windDirection
          },
          {
            title: "Pressure",
            value: Math.floor(pressure),
            unit: "hPa",
            commentary: pressureCommentary
          },
          {
            title: "Humidity",
            value: Math.floor(humidity),
            unit: "%",
            commentary: humidityCommentary
          },
          {
            title: "Visibility",
            value: metric ? Math.floor(visibility / 1000) : Math.floor(visibility * 0.000621371),
            unit: metric ? "km" : "mi",
            commentary: visibilityCommentary
          },
          {
            title: "Air Quality (CO Level)",
            value: Math.floor(airPollution.list[0].components.co),
            unit: "μg/m³",
            commentary: pollutionCommentary
          }
        ];
        return (
          <div className="Highlights">
            <SunHighlight sunrise={weather.sys.sunrise} sunset={weather.sys.sunset}/>
            {baseHighlights.map((highlight) =>
              <BaseHighlight key={highlight.title} data={highlight} />
            )}
          </div>
        );
      }
  }
}

export default Highlights;
