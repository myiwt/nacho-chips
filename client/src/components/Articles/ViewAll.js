import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import cogoToast from "cogo-toast";

import ArticleListItem from './ArticleListItem';
import logo from '../../logo.svg';
import '../../App.css';

class ViewAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
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

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    cogoToast.success('You are now logged out', {"hideAfter":1});
  };

  render() {
    const {user} = this.props.auth;
    const articles = this.state.articles;
    let articleList;

    if(!articles) {
      articleList = "There are no articles in the repository!";
    } else {
      articleList = articles.map((article, k) =>
        <ArticleListItem article={article} key={k} />
      );
    }

    return (
      <div className="ViewAll">
        <div className="navigation">
            <ul className="right-nav">
            <Link to="/" className="nav-btn">
                Home
            </Link>
            </ul>
            
            <ul className="right-nav">
            <button
              onClick={this.onLogoutClick}
              className="nav-btn"
              >
              Logout
            </button>
            </ul>
        </div>
        <div className="wrapper">
          
          <div className="article-list">
              {articleList}
          </div>

        </div>
        <div className="footer">
            <div className="logo">
                <img src={logo} alt="" width="50px" />
            </div>
        </div>
      </div>
    );
  }
}

ViewAll.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {logoutUser}
) (ViewAll);
