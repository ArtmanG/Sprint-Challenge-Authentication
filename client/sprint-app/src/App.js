import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./comps/Login";
import Register from './comps/register'
import PrivateRoute from './/utils/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/api/auth/register" component={Register} />
        <Route exact path="/api/auth/login" component={Login} />
        <PrivateRoute path='/api/jokes' component={Jokes} />
      </div>
    </Router>
  );
}

export default App;

