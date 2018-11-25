// import $ from 'jquery';
import React, { Component } from 'react';
import './NodeComponent.css';

function Node(props){
  let batteryStr = Math.round(props.value.bat * 100) + " %";
  let className = "node" + (props.value.active ? " active" : "") + (props.value.mode ? " record" : "");

    return(
      <div className="col-md-6">
        <div className={className}>
          <div className="row nodeHeader">
            <div className="col-sm-9 col-9">
              <p>Node {props.value.address} -- {props.value.id}</p>
            </div>
            <div className="col-sm-1 col-1">
              <a href="#">edit</a>
            </div>
            <div className="col-sm-1 col-1">
              <a href={props.api_host + "/nodes/" + props.value.address +"/log?duration=10h&granularity=5m"}>log</a>
            </div>
          </div>
          <div className="row">
            <ul>
              <li>id: {props.value.id}</li>
              <li>address: {props.value.address}</li>
              <li>rssi: {props.value.rssi} dB</li>
              <li>battery: {batteryStr}</li>
              <li>frequency: {props.value.freq} MHz</li>
              <li>recording: {(props.value.mode & 0x1) ? "yes" : "no"}</li>
              <li>flashlight: {(props.value.mode & 0x2) ? "yes" : "no"}</li>
              <li>last timestamp: {props.value.stamp}</li>
            </ul>
          </div>
        </div>
      </div>
    );
}

function PendingCommand(props){
  let paramStr = ""
  for (const p of props.value.params){
    paramStr += p + ", "
  }
  paramStr = paramStr.substr(0, paramStr.length - 2);

    return(
        <p>
          ID: {props.value.cmd_id} -- command: {props.value.cmd}({paramStr}) -- dst: {props.value.dst}
        </p>
    );
}

export default class NodeComponent extends Component {

  renderNodeGroup(){
    let nodes = this.props.nodeList.map((n) => {
      return this.renderNode(n);
    });

    let outList = []
    for (var i = 0; i < nodes.length; i+=2) {
      let children = [nodes[i]]

      if(i + 1 < nodes.length){
        children.push(nodes[i + 1])
      }
      let row = React.createElement('div', {className: 'row', key:'row_'+i}, children)
      outList.push(row)
    }
    return outList;
  }

  renderNode(nodeData){
    return(
      <Node
         key={nodeData.address}
         value={nodeData}
         api_host={this.props.api_host}
      />
    );
  }

  render() {
    let commands = this.props.pendingCommands.map((cmd, i) => {
      return(
        <PendingCommand
          key={"cmd_" + i}
          value={cmd}
        />
      );
    });

    return(
      <div className="container">
        <h1>
          Nodes
        </h1>
        {this.renderNodeGroup()}
        <h2>
          commands pending:
        </h2>
        {commands}
      </div>
    );
  }
};

// export default NodeComponent;
