import React from 'react';
import './App.css';
import apiKey from './secrets';
import Sidebar from './components/Sidebar/Sidebar.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      currentWeather: {}
    };
    this.unitSystem = "metric";
    this.lat = "45.18410544710932";
    this.lon = "5.7225307355130255";
    this.url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.lat
                + "&lon=" + this.lon
                + "&units=" + this.unitSystem
                + "&appid=" + apiKey;
  }

  componentDidMount() {
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
          <Sidebar currentWeather={currentWeather} />
        </div>
      )
    }
  }
}

export default App;
