import React, { Component } from 'react';
//import axios from 'axios';

import '../../App.css';
//import DOIAPI from './DOIAPI';
import SubmissionForm from './SubmissionForm';
import Navigation from '../Navigation';
import Footer from '../Footer';

class SubmissionView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  submissionHandler = (props) => {
    console.log(props);
  };
  
  componentDidMount() {
    
    
  };

  render() {
    const navLinks = {
      title: "Home",
      href: "/"
    };
    return (
      <div className="ViewAll">
        <Navigation links={navLinks}/>
        <div className="wrapper">
          <SubmissionForm handler={this.submissionHandler} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default SubmissionView;
