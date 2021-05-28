import React, { Component } from 'react';
import axios from 'axios';

import '../../App.css';
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
    const url = 'https://cise-seeds.herokuapp.com/api/repo/create';

    console.log(query);

    axios
    .post(url, query)
    .then(res => {

      if(res.data.success === 1)
      {
        console.log("Added");
      }
    })
    .catch(err =>{
      console.log('Error getting details from the repository!');
    })
  }

  submissionHandler = (ev) => {
    this.postQuery(ev);
  };

  componentDidMount() {
    
    
  };

  render() {
    const navLinks = [{
      title: "Home",
      href: "/"
    },
    {
      title: "Index",
      href: "/index"
    }];
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
