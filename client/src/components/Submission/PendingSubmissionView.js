import React, { Component } from 'react';
import axios from 'axios';

import '../../App.css';
import Navigation from '../Navigation';
import Footer from '../Footer';
import PendingSubmissionForm from './PendingSubmissionForm';

class PendingSubmissionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        evidence: null
    };
  }

  approveSubmission = (ev) => {
    const query = {};
    query.method = "approveSubmission";
    query.id = this.props.match.params.id;

    axios
    .post('http://cise-seeds.herokuapp.com/api/repo', query)
    .then(res => {
        if(res.data.success === 1)
        {
            //console.log(res.data.result);
            this.setState({
                evidence: res.data.result
            });
        }
    })
    .catch(err => {
        console.log("Article does not exist!");
    })
  };

  declineSubmission = (ev) => {
    const query = {};
    query.method = "declineSubmission";
    query.id = this.props.match.params.id;

    axios
    .post('http://cise-seeds.herokuapp.com/api/repo', query)
    .then(res => {
        if(res.data.success === 1)
        {
            //console.log(res.data.result);
            this.setState({
                evidence: res.data.result
            });
        }
    })
    .catch(err => {
        console.log("Article does not exist!");
    })
  };

  componentDidMount() {

    const query = {};
    query.method = "checkSubmission";
    query.id = this.props.match.params.id;

    axios
    .post('http://cise-seeds.herokuapp.com/api/repo', query)
    .then(res => {
        if(res.data.success === 1)
        {
            //console.log(res.data.result);
            this.setState({
                evidence: res.data.result
            });
        }
    })
    .catch(err => {
        console.log("Article does not exist!");
    })
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

    const evidence = this.state.evidence;
    //console.log(evidence);

    let form;
    if (evidence !== null) {
      //console.log("oof")
      form = <PendingSubmissionForm evidence={evidence} approve={this.approveSubmission} decline={this.declineSubmission} />;
    }

    return (

      <div className="Submission">
        <Navigation links={navLinks}/>
        <div className="wrapper">
            {form}
        </div>
        <Footer />
      </div>
    );
  }
}

export default PendingSubmissionView;
