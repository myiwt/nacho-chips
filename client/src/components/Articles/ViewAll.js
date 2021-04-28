import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ArticleListItem from './ArticleListItem';
import logo from '../../logo.svg';
import '../../App.css';
import SearchBar from '../SearchBar';

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

  render() {

    const articles = this.state.articles;
    let articleList;

    if(!articles) {
      articleList = "There are no articles in the repository!";
    } else {
      articleList = articles.map((article, k) =>
        <ArticleListItem article={article} key={k} />
      );
    }

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    
    const filterArticles = (articleList, query) => {
      if (!query) {
        return articleList;
      }
      
      return articleList.filter((article) => {
        const articleName = article.props.article.title;
        return articleName.includes(query);
      })
    }
    
    const filteredArticles = filterArticles(articleList, query);

    return (
      <div className="ViewAll">
        <div className="navigation">
            <ul className="right-nav">
            <Link to="/" className="nav-btn">
                Home
            </Link>
            <Link to="/view-all" className="nav-btn">
                View All Articles
            </Link>
            </ul>
        </div>
        <div className="wrapper">
          <div>
            <SearchBar />
          </div>
          <div className="article-list">
              {filteredArticles}
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

export default ViewAll;
