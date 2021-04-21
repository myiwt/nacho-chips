import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

/*import AddEntry from './components/AddEntry';
import ListEntries from './components/ListEntries';
import ShowEntryDetails from './components/ShowEntryDetails';
import UpdateEntry from './components/UpdateEntry';*/

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          
        </div>
      </Router>
    );
  }
}

/*

		  <Route exact path='/' component={ListEntries} />
          <Route path='/add-entry' component={AddEntry} />
          <Route path='/edit-entry/:id' component={UpdateEntry} />
          <Route path='/show-entry/:id' component={ShowEntryDetails} />

*/

export default App;
