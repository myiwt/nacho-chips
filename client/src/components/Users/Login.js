import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from '../../actions/authActions';
import classnames from "classnames";

import logo from '../../logo.svg';
import '../../App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        errors: {}
    };
  }

  componentDidMount() {
    axios
    .get('http://localhost:8080/api/login')
    .then(res => {

      if(res.data.success === 1)
      {
        this.setState({
          login: res.data.body
        })
      }
    })
    .catch(err =>{
      console.log('Error with login');
    })
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
      e.preventDefault();

  const userData = {
      email: this.state.email,
      password: this.state.password
  };

  console.log(userData);

  this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
};


  render() {
      const {errors} = this.state;
    return (
        <div className="Login">
          <div className="navigation">
              <ul className="right-nav">
              <Link to="/" className="nav-btn">
                  Home
              </Link>
              </ul>
          </div>
          <div className="wrapper">
          
          <div className="title">
                Login
          </div>

          <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>

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

export default Login;
