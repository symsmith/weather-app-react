import React from "react"
import "./App.css"
import apiUtils from "./utils/apiCalls"
import Content from "./components/Content/Content"
import Sidebar from "./components/Sidebar/Sidebar"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      error: null,
      isLoaded: false,
      currentWeather: {}
    }
    this.unitSystem = "metric"
  }

  fetchWeather(location) {
    apiUtils.fetchCurrentWeather(location, this.unitSystem).then(
      (result) => {
        this.setState({
          isLoaded: true,
          currentWeather: result
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

  handleSearch = (city) => {
    if (city !== "") this.fetchWeather({ city })
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.fetchWeather({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      })
    } else {
      this.fetchWeather({ city: "Paris" })
    }
  }

  render() {
    const { error, isLoaded, currentWeather } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading…</div>
    } else {
      return (
        <div className="App">
          <Sidebar
            currentWeather={currentWeather}
            onSearch={this.handleSearch}
          />
          <Content
            currentWeather={currentWeather}
            unitSystem={this.unitSystem}
          />
        </div>
      )
    }
  }
}

export default App
