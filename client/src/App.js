import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
//import ViewAll from './components/Articles/ViewAll';
import ViewAllTable from './components/Articles/ViewAllTable';
import SubmissionView from './components/Submission/SubmissionView';
import PendingSubmissionView from './components/Submission/PendingSubmissionView';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Home} /> {/* exact path required for home */}
          {/*<Route path='/view-all' component={ViewAll} /> */}
          <Route path='/index' component={ViewAllTable} />
          <Route path='/submit' component={SubmissionView} />
          <Route path='/pending/:id' component={PendingSubmissionView} />
        </div>
      </Router>
    );
  }
}

export default App;
