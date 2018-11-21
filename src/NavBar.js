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
    let apiHost = "http://" + window.location.hostname + ":8080"
    let recordMenuItems = this.props.nodeList.map((n) =>{
      let clickHandler = () => fetch(apiHost + "/nodes/cmd?address=" + n.address +"&action=record&duration=10s")
      return(
        <NodeMenuItem
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
            {/* <li className="nav-item">
              <a className="nav-link" href="/nodes">Nodes</a>
            </li> */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Command
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                <li className="dropdown-item dropdown-submenu">
                  <a href="#" data-toggle="dropdown" class="dropdown-toggle">Record</a>
                  <ul className="dropdown-menu">
                    {recordMenuItems}
                  </ul>
                </li>

                {/* <li>
                  <a className="dropdown-item" href="#" onClick={() => fetch(apiHost + "/nodes/cmd")}>Record</a>
                </li> */}
                <li>
                  <a className="dropdown-item" href="#">Another action</a>
                </li>
                {/* <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a> */}
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
        </div>
      </nav>
    );
  }

  componentDidMount(){
    $('.dropdown-submenu > a').on("click", function(e) {
      var submenu = $(this);
      $('.dropdown-submenu .dropdown-menu').removeClass('show');
      submenu.next('.dropdown-menu').addClass('show');
      e.stopPropagation();
    });

    $('.dropdown').on("hidden.bs.dropdown", function() {
      // hide any open menus when parent closes
      $('.dropdown-menu.show').removeClass('show');
    });
  }
}

export default NavBar;
