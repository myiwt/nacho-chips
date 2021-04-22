import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  };

  render() {
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Home Page</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
