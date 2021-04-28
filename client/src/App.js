import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser, logoutUser} from './actions/authActions';

import store from './store';
import './App.css';
import Home from './components/Home';
import ViewAll from './components/Articles/ViewAll';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import PrivateRoute from './components/private-route/PrivateRoute';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now()/1000 // convert to milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path='/' component={Home} /> {/* exact path required for home */}
            <Route path='/view-all' component={ViewAll} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Switch>
              <PrivateRoute exact path="/view-all" component = {ViewAll} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
