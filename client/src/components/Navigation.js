import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const Navigation = (props) => {
    return (
        <div className = "navigation">
            <ul className="right-nav">
                <Link to = {props.links.href} className="nav-btn">
                    {props.links.title}
                </Link>
            </ul>
        </div>
    )
};

export default Navigation;