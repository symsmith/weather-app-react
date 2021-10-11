import React from 'react';
import Week from './Week/Week';
import './Content.css';


class Content extends React.Component {
  render() {
    console.log(this.props.dayForecast);
    return (
      <div className="Content">
        <Week />
      </div>
    );
  }
}

export default Content;
