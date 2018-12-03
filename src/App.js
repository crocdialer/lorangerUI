import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import NodeComponent from './NodeComponent';

var api_host = "http://" + window.location.hostname +
  ( (window.location.port == 3000)  ? ":8080" : (":" + window.location.port))

class App extends Component {

  constructor(props){
    super(props);
    this.api_host = api_host

    // register event-stream
    this.eventSource = new EventSource(this.api_host + "/events")

    // fires only for unnamed events
    // this.eventSource.onmessage = this.handleSSE
    this.eventSource.addEventListener('node', this.handleNodeEvent, false);
    this.eventSource.addEventListener('commands', this.handleCommandEvent, false);

    // console.log("window.location.port: " + window.location.port)
    // console.log("api host: " + api_host)
  }
  state = {
    nodeList:[],
    pendingCommands:[]
  };

  handleNodeEvent = (e) => {
    let obj = JSON.parse(e.data)
    // console.log(e)

    let nodes = this.state.nodeList
    let foundNode = false

    for (let i = 0; i < nodes.length; i++){
      if(obj.address === nodes[i].address){
        foundNode = true;
        Object.assign(nodes[i], obj);
        break;
      }
    }

    if(!foundNode){
      nodes.push(obj)
      nodes.sort((lhs, rhs) => { return lhs.address > rhs.address; })
    }

    this.setState({ nodes })
  }

  handleCommandEvent = (e) => {
    let commandList = JSON.parse(e.data)
    this.setState(Object.assign({}, this.state, {pendingCommands : commandList}))
  }

  render() {
    return (
      <div className="loranger_ui">
        <NavBar
          nodeList={this.state.nodeList}
          api_host={this.api_host}
        />
        <NodeComponent
          nodeList={this.state.nodeList}
          pendingCommands={this.state.pendingCommands}
          api_host={this.api_host}
        />
      </div>
    );
  }

  update = () => {
      fetch(this.api_host + "/nodes")
        .then(response => response.json())
        .then(nodeList => this.setState({ nodeList }))
        .catch(error => console.error(error));

      fetch(this.api_host + "/nodes/cmd/pending")
        .then(response => response.json())
        .then(pendingCommands => this.setState({ pendingCommands }))
        .catch(error => console.error(error));
  }

  componentDidMount() {
    this.update();
    // this.interval = setInterval(this.update, 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }
}

export default App;

////////////////////////////////////////////////////////////////////////////////////////////////////

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

export function nodeCommand(dst = 0, command = "", params = []){
    postData(api_host + "/nodes/cmd", {dst : dst, cmd : command, params: params})
}
