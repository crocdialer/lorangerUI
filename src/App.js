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

////////////////////////////////////////////////////////////////////////////////////////////////////

// postData(`http://example.com/answer`, {answer: 42})
//   .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
//   .catch(error => console.error(error));

export function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error(error));
}
