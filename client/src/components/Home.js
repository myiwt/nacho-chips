import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import logo from '../logo.svg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Home">
        <div className="navigation">
            <ul className="right-nav">
            <Link to="/index" className="nav-btn">
                Index
            </Link>
            </ul>
        </div>
        <div className="wrapper">
          
          <div className="title">
                SEEDS
          </div>
          <div className="subtitle">
            Software Engineering Evidence Decision Support
          </div>

        </div>
        <div className="footer">
            <div className="logo">
                <img src={logo} alt="" width="50px" />
            </div>
            <span id="alt-text">
                Bret Norton | Megan Teh | Waldo Theron
            </span>
        </div>
      </div>
    );
  }
}

export default Home;