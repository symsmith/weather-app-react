import React from "react"
import apiUtils from "../../utils/apiCalls"
import DetailList from "./DetailList/DetailList"
import Highlights from "./Highlights/Highlights"
import "./Content.css"

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      oldCoord: this.props.currentWeather.coord,
      dailyForecast: {},
      hourlyForecast: {},
      weekActive: false
    }
  }

  fetchDetails() {
    apiUtils
      .fetchForecast(
        {
          lat: this.props.currentWeather.coord.lat,
          lon: this.props.currentWeather.coord.lon
        },
        this.props.unitSystem
      )
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            dailyForecast: result.daily,
            hourlyForecast: result.hourly,
            oldCoord: { lat: result.lat, lon: result.lon }
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
    this.fetchDetails()
  }

  componentDidUpdate() {
    if (
      this.props.currentWeather.coord.lat !== this.state.oldCoord.lat ||
      this.props.currentWeather.coord.lon !== this.state.oldCoord.lon
    ) {
      this.fetchDetails()
    }
  }

  render() {
    if (
      this.props.currentWeather.cod &&
      this.props.currentWeather.cod !== 200
    ) {
      return <div className="Content"></div>
    } else {
      const { error, isLoaded, dailyForecast, hourlyForecast, weekActive } =
        this.state
      if (error) {
        return <div>Error: {error.message}</div>
      } else if (!isLoaded) {
        return <div>Loading…</div>
      } else {
        return (
          <div className="Content">
            <h3 className="cardsSelect">
              <span
                className={
                  "timespanButton" +
                  (!weekActive ? " timespanButtonActive" : "")
                }
                onClick={() => this.setState({ weekActive: false })}
              >
                Today
              </span>
              <span
                className={
                  "timespanButton" + (weekActive ? " timespanButtonActive" : "")
                }
                onClick={() => this.setState({ weekActive: true })}
              >
                Week
              </span>
            </h3>
            {weekActive ? (
              <DetailList
                type="daily"
                forecast={dailyForecast}
                unitSystem={this.props.unitSystem}
              />
            ) : (
              <DetailList
                type="hourly"
                forecast={hourlyForecast}
                unitSystem={this.props.unitSystem}
              />
            )}
            <h2 className="highlightsTitle">Today's Highlights</h2>
            <Highlights
              weather={this.props.currentWeather}
              unitSystem={this.props.unitSystem}
            />
          </div>
        )
      }
    }
  }
}

export default Content
