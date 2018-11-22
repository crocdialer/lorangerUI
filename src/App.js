import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import NodeComponent from './NodeComponent';

class App extends Component {

  constructor(props){
    super(props);
    this.api_host = "http://" + window.location.hostname + ":8080"
  }
  state = {
    data:[]
  };
  render() {
    return (
      <div className="loranger_ui">
        <NavBar
          nodeList={this.state.data}
          api_host={this.api_host}
        />
        <NodeComponent
          nodeList={this.state.data}
          api_host={this.api_host}
        />
      </div>
    );
  }

  startRecord(address, duration){
    fetch(this.api_host + "/nodes/cmd");
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      fetch(this.api_host + "/nodes")
        .then(response => response.json())
        .then(data => this.setState({ data }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default App;
