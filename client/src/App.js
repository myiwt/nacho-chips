import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';

import Home from './components/Home';
import ViewAll from './components/Articles/ViewAll';
import Login from './components/Users/Login';
import Register from './components/Users/Register';

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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
