import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import logo from '../../logo.svg';
import '../../App.css';
import DataTable from './DataTable';
import SearchFunctions from '../Search/SearchFunctions';

class ViewAllTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      //search: ""
    };
  }
  
  claimStrengthBtnClick = (ev) => {
    //console.log(ev.target.value);
    let url = {};
    if(ev.target.value !== '')
    {
      url = 'http://localhost:8080/api/repo/claim_strength/'+ev.target.value;
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

    return (
      <div className="ViewAll">
        <div className="navigation">
            <ul className="right-nav">
            <Link to="/" className="nav-btn">
                Home
            </Link>
            </ul>
        </div>
        <div className="wrapper">
          <SearchFunctions searchBtnClick={this.claimStrengthBtnClick} />
          <DataTable articles={articles} />
        </div>
        <div className="footer noselect">
            <div className="logo">
                <img src={logo} alt="" width="50px" />
            </div>
        </div>
      </div>
    );
  }
}

export default ViewAllTable;
