import React, { Component } from 'react';
import './NodeComponent.css';

function Node(props){
    return(
      <div className="row">
        <div className="col-md-12 node">
          <p>Node {props.value.address}</p>
          <ul>
            <li>address: {props.value.address}</li>
            <li>rssi: {props.value.rssi}</li>
            <li>battery: {props.value.bat}</li>
            <li>freq: 434 MHz</li>
            <li>mode: {props.value.mode}</li>
            <li>last timestamp: {props.value.stamp}</li>
          </ul>
        </div>
      </div>
    );
}

export default class NodeComponent extends Component {

  renderNode(nodeData){
    return(
      <Node
         key={nodeData.address}
         value={nodeData}
      />
    );
  }

  render() {
    let nodes = this.props.nodeList.map((n) => {
      return this.renderNode(n);
    });

    return(
      <div className="container">
        <h1>
          Nodes
        </h1>
        {nodes}
      </div>
    );
  }
};

// export default NodeComponent;
