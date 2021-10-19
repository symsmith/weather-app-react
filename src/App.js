import React from 'react';
import './App.css';
import apiKey from './secrets';
import Content from './components/Content/Content';
import Sidebar from './components/Sidebar/Sidebar';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      currentWeather: {}
    };
    this.unitSystem = "metric";
  }

  fetchWeather(cityName) {
    let url = "https://pro.openweathermap.org/data/2.5/weather?q=" + cityName
      + "&units=" + this.unitSystem
      + "&appid=" + apiKey;
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          currentWeather: result
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

  handleSearch = (city) => {
    if (city !== "")
      this.fetchWeather(city);
  }

  componentDidMount() {
    this.fetchWeather("New York");
  }

  render() {
    const { error, isLoaded, currentWeather } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading…</div>;
    }
    else {
      return (
        <div className="App">
          <Sidebar currentWeather={currentWeather} onSearch={this.handleSearch} />
          <Content currentWeather={currentWeather} unitSystem={this.unitSystem} />
        </div>
      )
    }
  }
}

export default App;
