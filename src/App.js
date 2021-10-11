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
      currentWeather: {},
      cityName: "Lille"
    };
    this.unitSystem = "metric";
    this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.state.cityName
                + "&units=" + this.unitSystem
                + "&appid=" + apiKey;
  }

  fetchWeather() {
    fetch(this.url)
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
    this.setState({ cityName: city });
    console.log("ICII" + this.state.cityName);
    this.fetchWeather();
  }

  componentDidMount() {
    this.fetchWeather();
  }

  render() {
    const { error, isLoaded, currentWeather } = this.state;
    console.log(currentWeather);
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
          <Content />
        </div>
      )
    }
  }
}

export default App;
