import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import logo from '../logo.svg';

const Footer = () => {
    return (
        <div className="footer noselect">
            <Link to="/">
                <div className="logo">
                    <img src={logo} alt = "" width="50px"/>
                </div>
            </Link>
        </div>
    )
};

export default Footer;