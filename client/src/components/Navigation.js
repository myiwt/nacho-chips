import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const Navigation = (props) => {
    return (
        <div className = "navigation">
            <ul className="right-nav">
            {props.links.map((link, i) => (
                <Link to = {link.href} className="nav-btn" key={i}>
                    {link.title}
                </Link>
            ))}
            </ul>
        </div>
    )
};

export default Navigation;