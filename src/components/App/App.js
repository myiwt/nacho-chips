import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Result from '../Result/Result';
import useToken from './useToken';
import connectDB from '../../config/db';

function App() {
  const { token, setToken } = useToken();
  connectDB();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>SEEDS</h1>
      <p>Login successful!</p>
      <p>
        Login details will be stored in same session when you navigate
        to different pages
      </p>
      <p>
        Pages available: /dashboard and /result
      </p>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/result">
            <Result />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
