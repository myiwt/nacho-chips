import React, { Component } from 'react';
import axios from 'axios';

import '../../App.css';
import DataTable from './DataTable';
import SearchFunctions from '../Search/SearchFunctions';
import Footer from '../Footer';
import Navigation from '../Navigation';


class ViewAllTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      //search: ""
    };
  }
  
  claimStrengthBtnClick = (ev) => {
    let url = {};
    if(ev.target.value !== '')
    {
      url = 'http://localhost:8080/api/repo/'+ev.target.getAttribute("search_column")+"/"+ev.target.value;
    } else
    {
      url = 'http://localhost:8080/api/repo';
    }

    axios
    .get(url)
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

  

  // This function is called when page is loaded initially
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

  test = () => {
    console.log("test message");
  };

  render() {
    const articles = this.state.articles;
    //const search = this.state.search;
    const navLinks = {
      title:"Home",
      href:"/"
    };
    return (
      <div className="ViewAll">
        <Navigation links={navLinks}/>
        <div className="wrapper">
          <SearchFunctions searchBtnClick={this.claimStrengthBtnClick} testProp={this.test}/>
          <DataTable articles={articles} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default ViewAllTable;
