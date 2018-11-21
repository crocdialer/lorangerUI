import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import NodeComponent from './NodeComponent';

class App extends Component {
  state = {
    data:[{"address":1,"rssi":-30,"mode":0,"temp":0,"bat":0.290323,"stamp":"2018-11-21T16:43:39.058182298+01:00","gps":[0,0]},
          {"address":23,"rssi":-54,"mode":0,"temp":0,"bat":1,"stamp":"2018-11-21T16:43:39.706666293+01:00","gps":[0,0]}]
  };
  render() {
    return (
      <div>
        <NavBar />
        <NodeComponent />
      </div>
    );
  }
}

export default App;
