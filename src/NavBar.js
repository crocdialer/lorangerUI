// import $ from 'jquery';
import {postData, nodeCommand} from './App.js'
import React, { Component } from 'react';
import './NavBar.css';

function NodeMenuItem(props){
    return(
      <li className="dropdown-item" onClick={props.onClick}>
        <a className={props.enabled ? "enabled" : ""} href="#">{props.title}</a>
      </li>
    );
}

class NavBar extends Component {
  render() {
    let api_host = this.props.api_host;
    let recordTime = 60

    // items for the record dropdown menu
    let recordMenuItems = this.props.nodeList.map((n) =>{
      if(n.active) {
        let isRecording = n.mode & 1
        let clickHandler = () => nodeCommand(n.address, "record", [!isRecording, recordTime])
        return(
          <NodeMenuItem
            key={n.address}
            title={"Node " + n.address}
            enabled={isRecording}
            onClick={clickHandler}
          />
        );
      }
    });

    let cmdAllFactory = (command="", params=[]) => {
      return () => {
        for(const n of this.props.nodeList){
          nodeCommand(n.address, command, params)
        }
      }
    }

    // record: start all
    recordMenuItems.push(
      <NodeMenuItem
        key={this.props.nodeList.length}
        title={"start all"}
        enabled={false}
        onClick={cmdAllFactory("record", [true, recordTime])}
      />
    )
    // record: stop all
    recordMenuItems.push(
      <NodeMenuItem
        key={this.props.nodeList.length + 1}
        title={"stop all"}
        enabled={false}
        onClick={cmdAllFactory("record", [false])}
      />
    )

    // items for the flashlight dropdown menu
    let flashMenuItems = this.props.nodeList.map((n) =>{
      if(n.active) {
        let isFlashing = n.mode & 2
        let clickHandler = () => nodeCommand(n.address, "flash", [!isFlashing])
        return(
          <NodeMenuItem
            key={n.address}
            title={"Node " + n.address}
            enabled={isFlashing}
            onClick={clickHandler}
          />
        );
      }
    });

    // flash: start all
    flashMenuItems.push(
      <NodeMenuItem
        key={this.props.nodeList.length}
        title={"start all"}
        enabled={false}
        onClick={cmdAllFactory("flash", [true])}
      />
    )
    // flash: stop all
    flashMenuItems.push(
      <NodeMenuItem
        key={this.props.nodeList.length + 1}
        title={"stop all"}
        enabled={false}
        onClick={cmdAllFactory("flash", [false])}
      />
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">LoRanger</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Record
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {recordMenuItems}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Flashlight
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {flashMenuItems}
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/">Disabled</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
