import React from "react"
import apiUtils from "../../../utils/apiCalls"
import functions from "../../../utils/functions"
import BaseHighlight from "./BaseHighlight/BaseHighlight"
import SunHighlight from "./BaseHighlight/SunHighlight"
import "./Highlights.css"

class Highlights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      oldCoord: this.props.weather.coord,
      airPollution: {}
    }
  }

  fetchPollutionData = () => {
    apiUtils.fetchAirQuality(this.props.weather.coord).then(
      (result) => {
        this.setState({
          isLoaded: true,
          oldCoord: result.coord,
          airPollution: result
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
  }

  componentDidMount() {
    this.fetchPollutionData()
  }

  componentDidUpdate() {
    if (
      this.props.weather.coord.lat !== this.state.oldCoord.lat ||
      this.props.weather.coord.lon !== this.state.oldCoord.lon
    ) {
      this.fetchPollutionData()
    }
  }

  render() {
    const { error, isLoaded, airPollution } = this.state

    let weather = this.props.weather
    let metric = this.props.unitSystem === "metric"

    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading…</div>
    } else {
      let baseHighlights = [
        {
          title: "Wind Status",
          value: metric
            ? Math.floor(weather.wind.speed * 3.6 * 10) / 10
            : Math.floor(weather.wind.speed),
          unit: metric ? "km/h" : "mph",
          comment: functions.windDirection(weather.wind.deg)
        },
        {
          title: "Pressure",
          value: Math.floor(weather.main.pressure),
          unit: "hPa",
          comment: functions.pressureComment(weather.main.pressure)
        },
        {
          title: "Humidity",
          value: Math.floor(weather.main.humidity),
          unit: "%",
          comment: functions.humidityComment(weather.main.humidity)
        },
        {
          title: "Visibility",
          value: metric
            ? Math.floor(weather.visibility / 1000)
            : Math.floor(weather.visibility * 0.000621371),
          unit: metric ? "km" : "mi",
          comment: functions.visibilityComment(weather.visibility)
        },
        {
          title: "Air Quality (CO Level)",
          value: Math.floor(airPollution.list[0].components.co),
          unit: "μg/m³",
          comment: functions.pollutionComment(airPollution.list[0].main.aqi)
        }
      ]
      return (
        <div className="Highlights">
          <SunHighlight
            timezone={weather.timezone}
            sunrise={weather.sys.sunrise}
            sunset={weather.sys.sunset}
          />
          {baseHighlights.map((highlight) => (
            <BaseHighlight key={highlight.title} data={highlight} />
          ))}
        </div>
      )
    }
  }
}

export default Highlights
