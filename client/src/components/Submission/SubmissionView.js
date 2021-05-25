import React, { Component } from 'react';
import axios from 'axios';

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

  postQuery = (query) => {
    const url = 'http://localhost:8080/api/repo/create';

    console.log(query);

    axios
    .post(url, query)
    .then(res => {

      if(res.data.success === 1)
      {
        console.log("added");
      }
    })
    .catch(err =>{
      console.log('Error getting details from the repository!');
    })
  }

  submissionHandler = (ev) => {
    //console.log(ev);
    this.postQuery(ev);
  };

  uploadHandler = (ev) => {
    var reader = new FileReader();
    reader.onload = function(){
      console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(ev.target.files[0]);
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
          <SubmissionForm handler={this.submissionHandler} uploadhandler={this.uploadHandler}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SubmissionView;
