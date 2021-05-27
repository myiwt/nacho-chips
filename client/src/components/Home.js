import React, { Component } from 'react';
import '../App.css';

import logo from '../logo.svg';
import Navigation from './Navigation';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const navLinks = [{
      title: "Submit",
      href: "/submit"
    },
    {
      title: "Index",
      href: "/index"
    }]
    return (
      <div className="Home">
        < Navigation links={navLinks}/>
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