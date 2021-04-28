import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import classnames from "classnames";
import PropTypes from 'prop-types';

import logo from '../../logo.svg';
import '../../App.css';
import { registerUser} from "../../actions/authActions";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        email: "",
        password: "",
        passwordValidation: "",
        errors: {}
    };
}

componentDidMount() {
/*   axios
  .get('http://localhost:8080/api/register')
  .then(res => {

    if(res.data.success === 1)
    { }
  })
  .catch(err =>{
    console.log('Error with login');
  })
   */
  if (this.props.auth.isAuthenticated) {
    <Redirect to="http://localhost:8080/view-all"/>
  }
};

componentWillReceiveProps(nextProps) {
  if (nextProps.errors) {
    this.setState({
      errors: nextProps.errors
    });
  }
}

onChange = e => {
    this.setState({[e.target.id]: e.target.value});
};

onSubmit = e => {
    e.preventDefault();

const newUser = {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    passwordValidation: this.state.passwordValidation
};

  console.log(newUser);

  this.props.registerUser(newUser, this.props.history);
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
                Register
          </div>

          <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">
                  {errors.name}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.passwordValidation}
                  error={errors.passwordValidation}
                  id="passwordValidation"
                  type="password"
                  className={classnames("", {
                    invalid: errors.passwordValidation
                  })}
                />
                <label htmlFor="passwordValidation">Confirm Password</label>
                <span className="red-text">
                  {errors.passwordValidation}
                </span>
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
                >
                  Sign up
                </button>
              </div>
            </form>

          <div className="footer">
              <div className="logo">
                  <img src={logo} alt="" width="50px" />
              </div>
          </div>
        </div>
        </div>
      );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {registerUser}
) (withRouter(Register));
