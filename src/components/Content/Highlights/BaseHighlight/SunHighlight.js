import React from 'react';
import './Highlight.css';
import sunriseImg from './sunrise.png'
import sunsetImg from './sunset.png'


class SunHighlight extends React.Component {
  render() {
    let sunrise = new Date(this.props.sunrise * 1000);
    let sunset = new Date(this.props.sunset * 1000);
    let sunriseHours = sunrise.getHours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    let sunriseMinutes = sunrise.getMinutes().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    let sunsetHours = sunset.getHours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    let sunsetMinutes = sunset.getMinutes().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    return (
      <div className="SunHighlight BaseHighlight">
        <h3 className="highlightTitle">Sunrise &amp; Sunset</h3>
        <div className="sunTimes">
          <div className="sunTime">
            <img src={sunriseImg} alt="sunrise icon" className="sunImg" />
            <p className="sunHour">{sunriseHours}:{sunriseMinutes}</p>
          </div>
          <div className="sunTime">
            <img src={sunsetImg} alt="sunset icon" className="sunImg" />
            <p className="sunHour">{sunsetHours}:{sunsetMinutes}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SunHighlight;
