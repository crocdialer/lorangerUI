import $ from 'jquery';
import React, { Component } from 'react';
import './NodeComponent.css';

function Node(props){
  let batteryStr = Math.round(props.value.bat * 100) + " %";
  let className = "col-md-6 node" + (props.value.active ? " active" : "") + (props.value.mode ? " record" : "");
    return(
        <div className={className}>
          <p>Node {props.value.address}</p>
          <ul>
            <li>id: {props.value.id}</li>
            <li>address: {props.value.address}</li>
            <li>rssi: {props.value.rssi}</li>
            <li>battery: {batteryStr}</li>
            <li>freq: 434 MHz</li>
            <li>mode: {props.value.mode}</li>
            <li>last timestamp: {props.value.stamp}</li>
          </ul>
        </div>
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
      let row = React.createElement('div', {className: 'row'}, children)
      outList.push(row)
    }
    return outList;
  }

  renderNode(nodeData){
    return(
      <Node
         key={nodeData.address}
         value={nodeData}
      />
    );
  }

  render() {
    return(
      <div className="container">
        <h1>
          Nodes
        </h1>
        {this.renderNodeGroup()}
      </div>
    );
  }
};

// export default NodeComponent;
