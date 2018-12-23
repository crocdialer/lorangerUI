// import $ from 'jquery';
import React, { Component } from 'react';
import './NodeComponent.css';

function Node(props){
  let isRecording = (props.value.mode & (1 << 0));
  let isFlashing = (props.value.mode & (1 << 1));
  let hasGpsFix = (props.value.mode & (1 << 3));
  let batteryStr = props.value.bat + " %";
  let className = "node";

  // googlemaps location link
  let loc_link =
    <a href={"http://maps.google.com/maps?q=" + props.value.loc[0] + "," + props.value.loc[1]}>
      {props.value.loc[0] + ", " + props.value.loc[1]}
    </a>;

  // active/recording style
  if(props.value.active){
    className += " active" + (isRecording ? " record" : "");
  }

    return(
      <div className="col-md-6">
        <div className={className}>
          <div className="row nodeHeader">
            <div className="col-sm-10 col-10">
              <p>Node {props.value.address} -- {props.value.id}</p>
            </div>
            {/* <div className="col-sm-1 col-1">
              <a href="#">edit</a>
            </div> */}
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
              <li>recording: {isRecording ? "yes" : "no"}</li>
              <li>flashlight: {isFlashing ? "yes" : "no"}</li>
              <li>location: {hasGpsFix ? loc_link : "unknown"}</li>
              <li>last timestamp: {props.value.stamp}</li>
            </ul>
          </div>
        </div>
      </div>
    );
}

function PendingCommand(props){
  let command = props.value.command
  let stamps = props.value.stamps

  let paramStr = ""
  for (const p of props.value.command.arg){
    paramStr += p + ", "
  }
  paramStr = paramStr.substr(0, paramStr.length - 2);

    return(
        <p>
          ID: {command.id} -- command: {command.cmd}({paramStr}) -- dst: {command.dst} -- # transmit: {stamps.length}
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
      <div className="container nodeComponent">
        <div className="col-sm-10 col-10">
          <h2>
            nodes
          </h2>
        </div>
        {this.renderNodeGroup()}
        <div className="row nodeSection">
          <div className="col-sm-10 col-10">
            <h2>commands:</h2>
          </div>
          <div className="col-sm-1 col-1">
            <a href={this.props.api_host + "/nodes/cmd/log"}>log</a>
          </div>
        </div>
        {commands}
      </div>
    );
  }
};

// export default NodeComponent;
