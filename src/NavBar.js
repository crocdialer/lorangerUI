import $ from 'jquery';
import React, { Component } from 'react';
import './NavBar.css';

function NodeMenuItem(props){
    return(
      <li className="dropdown-item" onClick={props.onClick}>
        <a href="#">{props.title}</a>
      </li>
    );
}

class NavBar extends Component {
  render() {
    let api_host = this.props.api_host;

    // items for the record dropdown menu
    let recordMenuItems = this.props.nodeList.map((n) =>{
      if(!n.active) {
        return;
      }
      let clickHandler = () => fetch(api_host + "/nodes/cmd?address=" + n.address +"&action=record&value=1&duration=20s")
      return(
        <NodeMenuItem
          key={n.address}
          title={"Node " + n.address}
          onClick={clickHandler}
        />
      );
    });
    // items for the flashlight dropdown menu
    let flashMenuItems = this.props.nodeList.map((n) =>{
      if(!n.active) {
        return;
      }
      let clickHandler = () => fetch(api_host + "/nodes/cmd?address=" + n.address +"&action=flashlight&value=1")
      return(
        <NodeMenuItem
          key={n.address}
          title={"Node " + n.address}
          onClick={clickHandler}
        />
      );
    });
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">LoRa Gateway</a>
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
