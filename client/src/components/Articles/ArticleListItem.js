import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const ArticleListItem = (props) => {
    const article = props.article;

    return(
        <div className="article">
            <div className="details">
                <span id="title">
                    <Link to={`/view-article/${article._id}`}>
                        { article.title }
                    </Link>
                </span>
                <span id="author">{article.author}</span>
                <span id="practice">{article.software_dev_practice}</span>
                <span id="claim">{article.claim}</span>
                <span id="strength">{article.claim_strength}</span>
            </div>
        </div>
    )
};

export default ArticleListItem;
