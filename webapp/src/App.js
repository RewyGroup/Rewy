import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import RewyNavbar from './utils/RewyNavbar';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import QuestionForm from './components/Question/QuestionForm';
import QuestionListPage from './pages/QuestionListPage';


function App() {

  return (
    <div>
      <Router>
    <RewyNavbar/>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage}/>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/question/create" component={QuestionForm} />
      <Route exact path="/question/all" component={QuestionListPage} />
    </Switch>
    </Router>
    </div>
  );
}

export default App;
