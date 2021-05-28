import React, { Component } from 'react';
import axios from 'axios';

import '../../App.css';
import DataTable from './DataTable';
import SearchFunctions from '../Search/SearchFunctions';
import Navigation from '../Navigation';
import Footer from '../Footer';

class ViewAllTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      software_dev_practice: "",
      claim: "",
      claim_strength: ""
    };
  }
  
  postQuery = () => {
    const url = 'http://localhost:8080/api/repo';
    
    let query = {};

    query.method = "query";
    query.software_dev_practice = this.state.software_dev_practice;
    query.claim = this.state.claim;
    query.claim_strength = this.state.claim_strength;

    console.log(query);

    axios
    .post(url, query)
    .then(res => {

      if(res.data.success === 1)
      {
        this.setState({
          articles: res.data.result
        })
      }
    })
    .catch(err =>{
      console.log('Error getting details from the repository!');
      this.setState({
        articles: []
      })
    })
  }

  searchBtnClick = (ev) => {
    console.log(ev.target.getAttribute("searchcolumn"));
    console.log(ev.target.value);

    this.setState({[ev.target.getAttribute("searchcolumn")] : ev.target.value}, this.postQuery);
  }

  componentDidMount() {
    
    axios
    .get('http://localhost:8080/api/repo')
    .then(res => {

      if(res.data.success === 1)
      {
        this.setState({
          articles: res.data.result
        })
      }
    })
    .catch(err =>{
      console.log('Error getting details from the repository!');
    })
  };

  render() {
    const articles = this.state.articles;
    //const search = this.state.search;
    const navLinks = [{
      title: "Home",
      href: "/"
    }];
    return (
      <div className="ViewAll">
        <Navigation links={navLinks}/>
        <div className="wrapper">
          <SearchFunctions searchBtnClick={this.searchBtnClick} />
          <DataTable articles={articles} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default ViewAllTable;
