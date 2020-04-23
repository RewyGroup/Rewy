import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import RewyNavbar from './utils/RewyNavbar';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import HomePage from './pages/HomePage';


function App() {

  return (
    <div>
      <Router>
    <RewyNavbar/>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
    </Router>
    </div>
  );
}

export default App;
