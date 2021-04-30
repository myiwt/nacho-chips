import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";

import logo from "../../logo.svg";
import "../../App.css";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordValidation: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordValidation: this.state.passwordValidation,
    };

    this.props.registerUser(newUser, this.props.history);
    if (this.state.auth) {
    }
  };

  render() {
    const { errors } = this.state;

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
          <div className="title">Register</div>

          <form noValidate onSubmit={this.onSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name,
                })}
              />
              <span>{errors.name}</span>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email,
                })}
              />
              <span>{errors.email}</span>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password,
                })}
              />
              <span>{errors.password}</span>
            </div>
            <div>
              <label htmlFor="passwordValidation">Confirm Password</label>
              <input
                onChange={this.onChange}
                value={this.state.passwordValidation}
                error={errors.passwordValidation}
                id="passwordValidation"
                type="password"
                className={classnames("", {
                  invalid: errors.passwordValidation,
                })}
              />
              <span>{errors.passwordValidation}</span>
            </div>
            <div>
              <button type="submit" className="btn">
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
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
